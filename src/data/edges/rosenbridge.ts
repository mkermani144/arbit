import { ArbitEdgeId, GraphEdge } from '@/types/core-v2';

const rosenBridgeEdges: Record<ArbitEdgeId, GraphEdge> = {
  'rosenbridge:ERG-rsERG': {
    id: 'rosenbridge:ERG-rsERG',
    nodes: { x: 'ERG', y: 'rsERG' },
    market: {
      id: '',
      provider: 'rosenbridge',
    },
  },
  'rosenbridge:ADA-rsADA': {
    id: 'rosenbridge:ADA-rsADA',
    nodes: { x: 'ADA', y: 'rsADA' },
    market: {
      id: '',
      provider: 'rosenbridge',
    },
  },
  'rosenbridge:RSN-rsRSN': {
    id: 'rosenbridge:RSN-rsRSN',
    nodes: { x: 'RSN', y: 'rsRSN' },
    market: {
      id: '',
      provider: 'rosenbridge',
    },
  },
};

export default rosenBridgeEdges;
