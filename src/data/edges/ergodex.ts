import { keyBy } from '@/utils/keyBy';

const ergoDexEdges = keyBy(
  [
    {
      id: 'ergodex:ERG-rsADA',
      nodes: { x: 'ergo:ERG', y: 'ergo:rsADA' },
      market: {
        id: 'ae97c5eccd59a065cd973a8d6afb8bb79f9cc70368a7dcdf73aaeab1cedf6f6b',
        provider: 'ergodex',
      },
    },
    {
      id: 'ergodex:RSN-rsADA',
      nodes: { x: 'ergo:RSN', y: 'ergo:rsADA' },
      market: {
        id: '29f45df2736a7c7dd790b682fb15429961d7c1ae92e05c72a4f65d53fc0c47d7',
        provider: 'ergodex',
      },
    },
    {
      id: 'ergodex:ERG-RSN',
      nodes: { x: 'ergo:ERG', y: 'ergo:RSN' },
      market: {
        id: '1b694b15467c62f0cd4525e368dbdea2329c713aa200b73df4a622e950551b40',
        provider: 'ergodex',
      },
    },
    {
      id: 'ergodex:ERG-rsSNEK',
      nodes: { x: 'ergo:ERG', y: 'ergo:rsSNEK' },
      market: {
        id: '914ff648dc803839a9d6258f2bb7cd32328afbdd3707c6680ccaf47413ef100c',
        provider: 'ergodex',
      },
    },
  ],
  'id',
);

export default ergoDexEdges;
