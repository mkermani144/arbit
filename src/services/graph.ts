import { FUNDS_RANGE } from '@/constants';
import { asset2usd, usd2asset } from '@/lib/utils';
import { providerMap } from '@/providers/providers-map';
import { getAllEdgeIds, getEdgeById } from '@/repositories/edge';
import { getAllNodeIds, getNodeById } from '@/repositories/node';
import { ArbitEdgeId, ArbitGraph, ArbitNodeId, GraphNode } from '@/types/core';
import { getAdjacentNode } from '@/utils/graph/getAdjacentNode';
import { isNodePartOfEdge } from '@/utils/graph/isNodePartOfEdge';

let graph: ArbitGraph = {
  nodes: [],
  edges: [],
};

export const buildGraph = async () => {
  graph = {
    nodes: getAllNodeIds(),
    edges: getAllEdgeIds(),
  };
};

const findCycles = async (
  startingNode: ArbitNodeId,
  currentNode: ArbitNodeId,
  visited: Set<ArbitNodeId>,
  path: { edgeId: ArbitEdgeId; inputs: number[] }[],
  fees: number[],
  inputs: number[],
  optimalArbits: {
    path: { edgeId: ArbitEdgeId; optimalInput: number }[];
    finalOutput: number;
    profit: number;
    fund: number;
    startingNode: ArbitNodeId;
  }[],
) => {
  /**
   * Case 1: currentNode is already visited
   */
  if (visited.has(currentNode)) {
    if (currentNode === startingNode && path.length > 0) {
      const arbitOutputs = await asset2usd(getNodeById(startingNode), inputs);
      const [optimalProfit, optimalIndex] = arbitOutputs.reduce(
        (currentOptimal, amount, index) => {
          const optimalCandidate = amount - FUNDS_RANGE[index] - fees[index];
          return optimalCandidate > currentOptimal[0]
            ? [optimalCandidate, index]
            : currentOptimal;
        },
        [-Infinity, -1],
      );
      optimalArbits.push({
        path: path.map(({ edgeId, inputs: amounts }) => ({
          edgeId,
          optimalInput: amounts[optimalIndex],
        })),
        finalOutput: inputs[optimalIndex],
        profit: optimalProfit,
        fund: FUNDS_RANGE[optimalIndex],
        startingNode: startingNode,
      });
    }
    return optimalArbits;
  }

  /**
   * Case 2: currentNode is not visited
   */
  visited.add(currentNode);

  const pathEdges = path.map((path) => path.edgeId);
  const remainingEdges = graph.edges.filter(
    (edge) => !pathEdges.includes(edge),
  );
  for (const edgeId of remainingEdges) {
    const edge = getEdgeById(edgeId);
    const provider = providerMap.get(edge.market.provider)!;
    if (isNodePartOfEdge(currentNode, edge)) {
      path.push({ edgeId, inputs });

      const adjacentNode = getAdjacentNode(currentNode, edge);

      const swapType = edge.nodes.x === currentNode ? 'x2y' : 'y2x';
      const results = await provider[swapType](edge.market.id, inputs);

      const edgeFees =
        provider.type === 'real'
          ? await provider.getExplicitFee(currentNode, inputs)
          : inputs.map(() => 0);

      const updatedWeights = fees.map((fee, index) => fee + edgeFees[index]);

      await findCycles(
        startingNode,
        adjacentNode,
        visited,
        path,
        updatedWeights,
        results,
        optimalArbits,
      );

      path.pop();
    }
  }

  visited.delete(currentNode);

  return optimalArbits;
};

const findNodeOptimalArbits = async (node: ArbitNodeId, amounts: number[]) => {
  const initialInputs = await usd2asset(getNodeById(node), amounts);

  const optimalArbits = await findCycles(
    node,
    node,
    new Set(),
    [],
    new Array(amounts.length).fill(0),
    initialInputs,
    [],
  );

  return optimalArbits;
};

export const findOptimalArbits = async (amounts: number[]) => {
  const optimalArbits = await Promise.all(
    graph.nodes.map((node) => findNodeOptimalArbits(node, amounts)),
  );
  return optimalArbits.flat();
};

const findTopArbit = async (amounts: number[]) => {
  const optimalArbits = await findOptimalArbits(amounts);

  const topArbit = optimalArbits.reduce(
    (optimalArbit, currentOptimal) => {
      return currentOptimal.profit / currentOptimal.fund >
        optimalArbit.profit / optimalArbit.fund
        ? currentOptimal
        : optimalArbit;
    },
    { fund: 0, path: [], profit: -Infinity, startingNode: '', finalOutput: 0 },
  );

  return topArbit;
};

export const getFrontendArbitData = async () => {
  const topArbit = await findTopArbit(FUNDS_RANGE);

  if (topArbit.profit <= -5) {
    return {
      steps: [],
      profit: {
        usd: 0,
        percent: 0,
      },
    };
  }

  let { startingNode } = topArbit;
  const steps = topArbit.path.reduce(
    (currentSteps, { edgeId, optimalInput }, index) => {
      const edge = getEdgeById(edgeId);
      const edgeProvider = providerMap.get(edge.market.provider);

      if (edgeProvider?.type === 'abstract') {
        startingNode =
          edge.nodes.x === startingNode ? edge.nodes.y : edge.nodes.x;
        return currentSteps;
      }

      if (currentSteps.length === 0) {
        const fromToken = getNodeById(startingNode);
        const toToken = getNodeById(
          edge.nodes.x === startingNode ? edge.nodes.y : edge.nodes.x,
        );
        return [
          {
            id: edgeId,
            from: {
              token: fromToken,
              amount: optimalInput / 10 ** fromToken.decimals,
            },
            to: {
              token: toToken,
              amount:
                topArbit.path[index + 1].optimalInput / 10 ** toToken.decimals,
            },
            provider: {
              name: edgeProvider!.name,
              url: edgeProvider!.url,
            },
          },
        ];
      }
      const fromToken = getNodeById(
        currentSteps.at(-1)!.to.token.id === edge.nodes.x
          ? edge.nodes.x
          : edge.nodes.y,
      );
      const toToken = getNodeById(
        currentSteps.at(-1)!.to.token.id === edge.nodes.x
          ? edge.nodes.y
          : edge.nodes.x,
      );
      return [
        ...currentSteps,
        {
          id: edgeId,
          from: {
            token: fromToken,
            amount: optimalInput / 10 ** fromToken.decimals,
          },
          to: {
            token: toToken,
            amount:
              (index === topArbit.path.length - 1
                ? topArbit.finalOutput
                : topArbit.path[index + 1].optimalInput) /
              10 ** toToken.decimals,
          },
          provider: {
            name: edgeProvider!.name,
            url: edgeProvider!.url,
          },
        },
      ];
    },
    [] as {
      id: string;
      from: {
        token: GraphNode;
        amount: number;
      };
      to: {
        token: GraphNode;
        amount: number;
      };
      provider: {
        name: string;
        url: string;
      };
    }[],
  );

  return {
    steps,
    profit: {
      usd: topArbit.profit,
      percent: topArbit.profit / topArbit.fund,
    },
  };
};
