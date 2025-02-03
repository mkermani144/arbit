import { ArbitNodeId, GraphNode } from '@/types/core-v2';

const ergoNodes: Record<ArbitNodeId, GraphNode> = {
  'ergo:ERG': {
    id: 'ergo:ERG',
    name: 'ERG',
    coingeckoId: 'ergo',
    decimals: 9,
    nativeId: '',
  },
  'ergo:rsADA': {
    id: 'ergo:rsADA',
    name: 'rsADA',
    coingeckoId: 'cardano',
    decimals: 6,
    nativeId:
      'e023c5f382b6e96fbd878f6811aac73345489032157ad5affb84aefd4956c297',
  },
  'ergo:RSN': {
    id: 'ergo:RSN',
    name: 'RSN',
    coingeckoId: 'rosen-bridge',
    decimals: 3,
    nativeId:
      '8b08cdd5449a9592a9e79711d7d79249d7a03c535d17efaee83e216e80a44c4b',
  },
};

export default ergoNodes;
