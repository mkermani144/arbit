import { FUNDS_RANGE } from '@/constants';
import { asset2usd, usd2asset } from '@/lib/utils';
import { providerMap } from '@/providers/providers-map';
import { getAllEdgeIds, getEdgeById } from '@/repositories/edge';
import { getAllNodeIds, getNodeById } from '@/repositories/node';
import {
  ArbitEdgeId,
  ArbitGraph,
  ArbitNodeId,
  GraphRepresentedArbit,
} from '@/types/core';
import { getAdjacentNode } from '@/utils/graph/getAdjacentNode';
import { isNodePartOfEdge } from '@/utils/graph/isNodePartOfEdge';
import { humanizeGraphRepresentedArbit } from '@/utils/graph/humanizeGraphRepresentedArbit';

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
  optimalArbits: GraphRepresentedArbit[],
  nodesToIgnore: ArbitNodeId[],
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
  const pathEdges = path.map((path) => path.edgeId);
  const remainingEdges = graph.edges.filter(
    (edge) => !pathEdges.includes(edge),
  );
  for (const edgeId of remainingEdges) {
    const edge = getEdgeById(edgeId);
    const provider = providerMap.get(edge.market.provider)!;
    if (
      isNodePartOfEdge(currentNode, edge) &&
      !nodesToIgnore.some((innerNode) => isNodePartOfEdge(innerNode, edge))
    ) {
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
        nodesToIgnore,
      );

      path.pop();
    }
  }

  return optimalArbits;
};

const findNodeOptimalArbits = async (
  node: ArbitNodeId,
  amounts: number[],
  nodesToIgnore: ArbitEdgeId[],
) => {
  const initialInputs = await usd2asset(getNodeById(node), amounts);

  const optimalArbits = await findCycles(
    node,
    node,
    [],
    new Array(amounts.length).fill(0),
    initialInputs,
    [],
    nodesToIgnore,
  );

  return optimalArbits;
};

export const findOptimalArbits = async (amounts: number[]) => {
  providerMap.forEach((provider) => provider.prefetchMarketData?.());

  const optimalArbits = await Promise.all(
    graph.nodes.map((node, index) =>
      findNodeOptimalArbits(node, amounts, graph.nodes.slice(0, index)),
    ),
  );
  return optimalArbits.flat();
};

const findTopArbit = async (amounts: number[]) => {
  const optimalArbits = await findOptimalArbits(amounts);

  const topArbit = optimalArbits.reduce((optimalArbit, currentOptimal) => {
    return currentOptimal.profitUsd / currentOptimal.fund >
      optimalArbit.profitUsd / optimalArbit.fund
      ? currentOptimal
      : optimalArbit;
  });

  return topArbit;
};

export const getFrontendArbitData = async () => {
  const topArbit = await findTopArbit(FUNDS_RANGE);

  if (topArbit.profitUsd <= 0) {
    return {
      steps: [],
      profit: {
        usd: 0,
        percent: 0,
      },
    };
  }

  return humanizeGraphRepresentedArbit(topArbit);
};
