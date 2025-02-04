import nodes from '@/data/nodes';
import { ArbitNodeId } from '@/types/core';

export const getAllNodeIds = () => {
  return Object.keys(nodes);
};

export const getNodeById = (id: ArbitNodeId) => {
  return nodes[id];
};
