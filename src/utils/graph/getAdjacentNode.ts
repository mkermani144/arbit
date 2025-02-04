import { GraphEdge } from '@/types/core';

export const getAdjacentNode = (node: string, edge: GraphEdge) => {
  return edge.nodes.x === node ? edge.nodes.y : edge.nodes.x;
};
