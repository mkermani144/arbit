import { GraphEdge } from '@/types/core-v2';

export const isNodePartOfEdge = (node: string, edge: GraphEdge) => {
  return edge.nodes.x === node || edge.nodes.y === node;
};
