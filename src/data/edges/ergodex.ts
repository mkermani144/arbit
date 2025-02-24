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
    {
      id: 'ergodex:ERG-rsBTC',
      nodes: { x: 'ergo:ERG', y: 'ergo:rsBTC' },
      market: {
        id: '47a811c68e49f6bfa6629602037ee65f8d175ddbc7b64bdb65ad40599b812fd0',
        provider: 'ergodex',
      },
    },
    {
      id: 'ergodex:COMET-rsHOSKY',
      nodes: { x: 'ergo:COMET', y: 'ergo:rsHOSKY' },
      market: {
        id: '66fd1a6e49858a7e1ee12609057d407f2c3f96ce4e363e06d8dbae1468e01c64',
        provider: 'ergodex',
      },
    },
    {
      id: 'ergodex:ERG-COMET',
      nodes: { x: 'ergo:ERG', y: 'ergo:COMET' },
      market: {
        id: '1f01dc8e29806d96ca0b79f8e798cd8cfce51c0e676aaedf6ab3464b37da9dfd',
        provider: 'ergodex',
      },
    },
  ],
  'id',
);

export default ergoDexEdges;
