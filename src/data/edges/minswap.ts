import { ArbitEdgeId, GraphEdge } from '@/types/core-v2';

const minswapEdges: Record<ArbitEdgeId, GraphEdge> = {
  'minswap:ADA-rsERG': {
    id: 'minswap:ADA-rsERG',
    nodes: { x: 'cardano:ADA', y: 'cardano:rsERG' },
    market: {
      id: 'dc06f64060dfa4119c56f8f5b8c69f897a335e3e9802456f4ae26ff7f6f1b570-f5808c2c990d86da54bfc97d89cee6efa20cd8461616359478d96b4c-bae40b377b196400f601fb1d04bd75486cfc2b5cbab9329bb49a1dfe93180fdf',
      provider: 'minswap',
    },
  },
  'minswap:ADA-rsRSN': {
    id: 'minswap:ADA-rsRSN',
    nodes: { x: 'cardano:ADA', y: 'cardano:rsRSN' },
    market: {
      id: 'c37fd1213a1003d1cf360cdf0680a61aaca068c5e175e54448931b40ebc80053-f5808c2c990d86da54bfc97d89cee6efa20cd8461616359478d96b4c-32b2e465e2e93356c1e167f782bcc0ab8ff2e6d6f4ec225919f008e4d573af45',
      provider: 'minswap',
    },
  },
};

export default minswapEdges;
