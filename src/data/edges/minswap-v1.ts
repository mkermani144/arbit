import { keyBy } from '@/utils/keyBy';

const minswapV1Edges = keyBy(
  [
    {
      id: 'minswapv1:ADA-rsERG',
      nodes: { x: 'cardano:ADA', y: 'cardano:rsERG' },
      market: {
        id: 'dc06f64060dfa4119c56f8f5b8c69f897a335e3e9802456f4ae26ff7f6f1b570',
        provider: 'minswapv1',
      },
    },
    {
      id: 'minswapv1:ADA-rsRSN',
      nodes: { x: 'cardano:ADA', y: 'cardano:rsRSN' },
      market: {
        id: 'c37fd1213a1003d1cf360cdf0680a61aaca068c5e175e54448931b40ebc80053',
        provider: 'minswapv1',
      },
    },
    {
      id: 'minswapv1:ADA-SNEK',
      nodes: { x: 'cardano:ADA', y: 'cardano:SNEK' },
      market: {
        id: '63f2cbfa5bf8b68828839a2575c8c70f14a32f50ebbfa7c654043269793be896',
        provider: 'minswapv1',
      },
    },
    {
      id: 'minswapv1:ADA-HOSKY',
      nodes: { x: 'cardano:ADA', y: 'cardano:HOSKY' },
      market: {
        id: '11e236a5a8826f3f8fbc1114df918b945b0b5d8f9c74bd383f96a0ea14bffade',
        provider: 'minswapv1',
      },
    },
  ],
  'id',
);

export default minswapV1Edges;
