import { FUNDS_RANGE } from '@/constants';
import { asset2usd, usd2asset } from '@/lib/utils';
import { providerMap } from '@/providers/providers-map';
import { getAllEdgeIds, getEdgeById } from '@/repositories/edge';
import { getAllNodeIds, getNodeById } from '@/repositories/node';
import { ArbitEdgeId, ArbitGraph, ArbitNodeId, ArbitNode } from '@/types/core';
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
  cycleStart: ArbitNodeId,
  currentNode: ArbitNodeId,
  path: { edgeId: ArbitEdgeId; inputs: number[] }[],
  pathFees: number[],
  pathInputs: number[],
  optimalArbits: {
    arbit: { edgeId: ArbitEdgeId; optimalInput: number }[];
    finalOutput: number;
    profitUsd: number;
    fund: number;
    arbitStart: ArbitNodeId;
  }[],
) => {
  /**
   * Case 1: currentNode is already visited
   */
  const isVisited = path.some(({ edgeId }, index) => {
    const edge = getEdgeById(edgeId);
    return isNodePartOfEdge(currentNode, edge) && index !== path.length - 1;
  });
  if (isVisited) {
    if (currentNode === cycleStart && path.length > 0) {
      const arbitOutputs = await asset2usd(getNodeById(cycleStart), pathInputs);
      const [optimalProfit, optimalIndex] = arbitOutputs.reduce(
        (currentOptimal, amount, index) => {
          const optimalCandidate =
            amount - FUNDS_RANGE[index] - pathFees[index];
          return optimalCandidate > currentOptimal[0]
            ? [optimalCandidate, index]
            : currentOptimal;
        },
        [-Infinity, -1],
      );
      optimalArbits.push({
        arbit: path.map(({ edgeId, inputs: amounts }) => ({
          edgeId,
          optimalInput: amounts[optimalIndex],
        })),
        finalOutput: pathInputs[optimalIndex],
        profitUsd: optimalProfit,
        fund: FUNDS_RANGE[optimalIndex],
        arbitStart: cycleStart,
      });
    }
    return optimalArbits;
  }

  /**
   * Case 2: currentNode is not visited
   */
  // visited.add(currentNode);

  const pathEdges = path.map((path) => path.edgeId);
  const remainingEdges = graph.edges.filter(
    (edge) => !pathEdges.includes(edge),
  );
  for (const edgeId of remainingEdges) {
    const edge = getEdgeById(edgeId);
    const provider = providerMap.get(edge.market.provider)!;
    if (isNodePartOfEdge(currentNode, edge)) {
      path.push({ edgeId, inputs: pathInputs });

      const adjacentNode = getAdjacentNode(currentNode, edge);

      const swapType = edge.nodes.x === currentNode ? 'x2y' : 'y2x';

      const [results, edgeFees] = await Promise.all([
        provider[swapType](edge.market.id, pathInputs),
        provider.type === 'real'
          ? provider.getExplicitFee(currentNode, pathInputs)
          : pathInputs.map(() => 0),
      ]);

      const updatedWeights = pathFees.map(
        (fee, index) => fee + edgeFees[index],
      );

      await findCycles(
        cycleStart,
        adjacentNode,
        path,
        updatedWeights,
        results,
        optimalArbits,
      );

      path.pop();
    }
  }

  return optimalArbits;
};

const findNodeOptimalArbits = async (node: ArbitNodeId, amounts: number[]) => {
  const initialInputs = await usd2asset(getNodeById(node), amounts);

  const optimalArbits = await findCycles(
    node,
    node,
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
      return currentOptimal.profitUsd / currentOptimal.fund >
        optimalArbit.profitUsd / optimalArbit.fund
        ? currentOptimal
        : optimalArbit;
    },
    { fund: Infinity, arbit: [], profitUsd: 0, arbitStart: '', finalOutput: 0 },
  );

  return topArbit;
};

export const getFrontendArbitData = async () => {
  const topArbit = await findTopArbit(FUNDS_RANGE);

  if (topArbit.profitUsd <= -5) {
    return {
      steps: [],
      profit: {
        usd: 0,
        percent: 0,
      },
    };
  }

  let { arbitStart: startingNode } = topArbit;
  const steps = topArbit.arbit.reduce(
    (currentSteps, { edgeId, optimalInput }, index) => {
      const edge = getEdgeById(edgeId);
      const edgeProvider = providerMap.get(edge.market.provider);

      if (edgeProvider?.type === 'abstract') {
        startingNode =
          edge.nodes.x === startingNode ? edge.nodes.y : edge.nodes.x;
        return currentSteps;
      }

      const lastNode = currentSteps.length
        ? currentSteps.at(-1)!.to.token.id
        : startingNode;

      const fromToken = getNodeById(
        lastNode === edge.nodes.x ? edge.nodes.x : edge.nodes.y,
      );
      const toToken = getNodeById(
        lastNode === edge.nodes.x ? edge.nodes.y : edge.nodes.x,
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
              (index === topArbit.arbit.length - 1
                ? topArbit.finalOutput
                : topArbit.arbit[index + 1].optimalInput) /
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
        token: ArbitNode;
        amount: number;
      };
      to: {
        token: ArbitNode;
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
      usd: topArbit.profitUsd,
      percent: topArbit.profitUsd / topArbit.fund,
    },
  };
};
