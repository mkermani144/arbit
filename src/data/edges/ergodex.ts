import { ArbitEdgeId, GraphEdge } from '@/types/core-v2';

const ergoDexEdges: Record<ArbitEdgeId, GraphEdge> = {
  'ergodex:ERG-rsADA': {
    id: 'ergodex:ERG-rsADA',
    nodes: { x: 'ERG', y: 'rsADA' },
    market: {
      id: 'ae97c5eccd59a065cd973a8d6afb8bb79f9cc70368a7dcdf73aaeab1cedf6f6b',
      provider: 'ergodex',
    },
  },
  'ergodex:RSN-rsADA': {
    id: 'ergodex:RSN-rsADA',
    nodes: { x: 'RSN', y: 'rsADA' },
    market: {
      id: '29f45df2736a7c7dd790b682fb15429961d7c1ae92e05c72a4f65d53fc0c47d7',
      provider: 'ergodex',
    },
  },
  'ergodex:ERG-RSN': {
    id: 'ergodex:ERG-RSN',
    nodes: { x: 'ERG', y: 'RSN' },
    market: {
      id: '1b694b15467c62f0cd4525e368dbdea2329c713aa200b73df4a622e950551b40',
      provider: 'ergodex',
    },
  },
};

export default ergoDexEdges;
