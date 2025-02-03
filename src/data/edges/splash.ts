import { ArbitEdgeId, GraphEdge } from '@/types/core-v2';

const splashEdges: Record<ArbitEdgeId, GraphEdge> = {
  'splash:rsERG-ADA': {
    id: 'splash:rsERG-ADA',
    nodes: { x: 'cardano:rsERG', y: 'cardano:ADA' },
    market: {
      id: '04b95368393c821f180deee8229fbd941baaf9bd748ebcdbf7adbb14.7273455247',
      provider: 'splash',
    },
  },
  'splash:rsRSN-ADA': {
    id: 'splash:rsRSN-ADA',
    nodes: { x: 'cardano:rsRSN', y: 'cardano:ADA' },
    market: {
      id: '04b95368393c821f180deee8229fbd941baaf9bd748ebcdbf7adbb14.727352534e',
      provider: 'splash',
    },
  },
};

export default splashEdges;
