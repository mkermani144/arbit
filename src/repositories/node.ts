import nodes from '@/data/nodes';
import { ArbitNodeId } from '@/types/core-v2';

export const getAllNodeIds = () => {
  return Object.keys(nodes);
};

export const getNodeById = (id: ArbitNodeId) => {
  return nodes[id];
};
