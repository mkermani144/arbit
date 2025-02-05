import { ArbitEdge } from '@/types/core';

export const isNodePartOfEdge = (node: string, edge: ArbitEdge) => {
  return edge.nodes.x === node || edge.nodes.y === node;
};
