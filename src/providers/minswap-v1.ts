import { BlockFrostAPI } from '@blockfrost/blockfrost-js';
import {
  BlockfrostAdapter,
  calculateSwapExactIn,
  NetworkId,
} from '@minswap/sdk';

import minswapV1Edges from '@/data/edges/minswap-v1';
import { asset2usd, timedCache } from '@/lib/utils';
import { getNodeById } from '@/repositories/node';
import { ArbitNodeId, Provider } from '@/types/core';

const blockFrostApi = new BlockFrostAPI({
  projectId: process.env.BLOCKFROST_PROJECT_ID!,
  network: 'mainnet',
});
const adapter = new BlockfrostAdapter({
  blockFrost: blockFrostApi,
  networkId: NetworkId.MAINNET,
});

const getPools = timedCache(async (marketId: string) => {
  return adapter.getV1PoolById({ id: marketId });
});

const MinswapV1: Provider = {
  id: 'minswapv1',
  name: 'MinSwapV1',
  type: 'real',
  url: 'https://app.minswap.org/swap',

  async prefetchMarketData() {
    Object.values(minswapV1Edges).map((edge) => getPools(edge.market.id));
  },

  async getExplicitFee(nodeId: ArbitNodeId, amounts: number[]) {
    const node = getNodeById(nodeId);
    const ada = getNodeById('cardano:ADA');
    const [assetPrices, [adaPrice]] = await Promise.all([
      asset2usd(node, amounts),
      asset2usd(ada, [1_000000]),
    ]);
    const serviceFee = 2 * adaPrice;
    const maxNetworkFee = 0.2 * adaPrice;
    return assetPrices.map(() => {
      return serviceFee + maxNetworkFee;
    });
  },

  async x2y(marketId: string, amounts: number[]) {
    const pools = (await getPools(marketId))!;

    return amounts.map((amount) => {
      const out = calculateSwapExactIn({
        amountIn: BigInt(amount),
        reserveIn: pools.reserveA,
        reserveOut: pools.reserveB,
      });
      return Number(out.amountOut);
    });
  },

  async y2x(marketId: string, amounts: number[]) {
    const pools = (await getPools(marketId))!;

    return amounts.map((amount) => {
      const out = calculateSwapExactIn({
        amountIn: BigInt(amount),
        reserveIn: pools.reserveB,
        reserveOut: pools.reserveA,
      });
      return Number(out.amountOut);
    });
  },
};

export default MinswapV1;
