import { keyBy } from '@/utils/keyBy';

const minswapV2Edges = keyBy(
  [
    {
      id: 'minswapv2:ADA-rsERG',
      nodes: { x: 'cardano:ADA', y: 'cardano:rsERG' },
      market: {
        id: 'f5808c2c990d86da54bfc97d89cee6efa20cd8461616359478d96b4c-bae40b377b196400f601fb1d04bd75486cfc2b5cbab9329bb49a1dfe93180fdf',
        provider: 'minswapv2',
      },
    },
    {
      id: 'minswapv2:ADA-rsRSN',
      nodes: { x: 'cardano:ADA', y: 'cardano:rsRSN' },
      market: {
        id: 'f5808c2c990d86da54bfc97d89cee6efa20cd8461616359478d96b4c-32b2e465e2e93356c1e167f782bcc0ab8ff2e6d6f4ec225919f008e4d573af45',
        provider: 'minswapv2',
      },
    },
    {
      id: 'minswapv2:ADA-SNEK',
      nodes: { x: 'cardano:ADA', y: 'cardano:SNEK' },
      market: {
        id: 'f5808c2c990d86da54bfc97d89cee6efa20cd8461616359478d96b4c-2ffadbb87144e875749122e0bbb9f535eeaa7f5660c6c4a91bcc4121e477f08d',
        provider: 'minswapv2',
      },
    },
    {
      id: 'minswapv2:ADA-rsBTC',
      nodes: { x: 'cardano:ADA', y: 'cardano:rsBTC' },
      market: {
        id: 'f5808c2c990d86da54bfc97d89cee6efa20cd8461616359478d96b4c-ece87801e02b3c21436f212156acee8f53ff6678abf9e03a9e52ab42ca6be00c',
        provider: 'minswapv2',
      },
    },
    {
      id: 'minswapv2:HOSKY-rsCOMET',
      nodes: { x: 'cardano:HOSKY', y: 'cardano:rsCOMET' },
      market: {
        id: 'f5808c2c990d86da54bfc97d89cee6efa20cd8461616359478d96b4c-353e8ed6a6cc3b5f2dbc6c62221ca37d3eef9bf1472abac7869cba3afb9bd79b',
        provider: 'minswapv2',
      },
    },
    {
      id: 'minswapv2:ADA-HOSKY',
      nodes: { x: 'cardano:ADA', y: 'cardano:HOSKY' },
      market: {
        id: 'f5808c2c990d86da54bfc97d89cee6efa20cd8461616359478d96b4c-a449f98fa06fff1d6c17b95c65ca609660049dc683cc3e94d3846b05419fc20d',
        provider: 'minswapv2',
      },
    },
  ],
  'id',
);

export default minswapV2Edges;
