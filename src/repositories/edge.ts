import edges from '@/data/edges';
import { ArbitEdgeId } from '@/types/core-v2';

export const getAllEdgeIds = () => {
  return Object.keys(edges);
};

export const getEdgeById = (id: ArbitEdgeId) => {
  return edges[id];
};
