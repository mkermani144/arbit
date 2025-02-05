import { ArbitEdge } from '@/types/core';

export const getAdjacentNode = (node: string, edge: ArbitEdge) => {
  return edge.nodes.x === node ? edge.nodes.y : edge.nodes.x;
};
