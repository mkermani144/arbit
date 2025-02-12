import { keyBy } from '@/utils/keyBy';

const rosenBridgeEdges = keyBy(
  [
    {
      id: 'rosenbridge:ERG-rsERG',
      nodes: { x: 'ergo:ERG', y: 'cardano:rsERG' },
      market: {
        id: '',
        provider: 'rosenbridge',
      },
    },
    {
      id: 'rosenbridge:ADA-rsADA',
      nodes: { x: 'cardano:ADA', y: 'ergo:rsADA' },
      market: {
        id: '',
        provider: 'rosenbridge',
      },
    },
    {
      id: 'rosenbridge:RSN-rsRSN',
      nodes: { x: 'ergo:RSN', y: 'cardano:rsRSN' },
      market: {
        id: '',
        provider: 'rosenbridge',
      },
    },
    {
      id: 'rosenbridge:SNEK-rsSNEK',
      nodes: { x: 'cardano:SNEK', y: 'ergo:rsSNEK' },
      market: {
        id: '',
        provider: 'rosenbridge',
      },
    },
    {
      id: 'rosenbridge:rsBTC-rsBTC',
      nodes: { x: 'cardano:rsBTC', y: 'ergo:rsBTC' },
      market: {
        id: '',
        provider: 'rosenbridge',
      },
    },
  ],
  'id',
);

export default rosenBridgeEdges;
