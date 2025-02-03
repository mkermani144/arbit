import { ArbitEdgeId, GraphEdge } from '@/types/core-v2';

const rosenBridgeEdges: Record<ArbitEdgeId, GraphEdge> = {
  'rosenbridge:ERG-rsERG': {
    id: 'rosenbridge:ERG-rsERG',
    nodes: { x: 'ergo:ERG', y: 'cardano:rsERG' },
    market: {
      id: '',
      provider: 'rosenbridge',
    },
  },
  'rosenbridge:ADA-rsADA': {
    id: 'rosenbridge:ADA-rsADA',
    nodes: { x: 'cardano:ADA', y: 'ergo:rsADA' },
    market: {
      id: '',
      provider: 'rosenbridge',
    },
  },
  'rosenbridge:RSN-rsRSN': {
    id: 'rosenbridge:RSN-rsRSN',
    nodes: { x: 'ergo:RSN', y: 'cardano:rsRSN' },
    market: {
      id: '',
      provider: 'rosenbridge',
    },
  },
};

export default rosenBridgeEdges;
