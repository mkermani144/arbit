import { BlockFrostAPI } from '@blockfrost/blockfrost-js';
import { BlockfrostAdapter, DexV2Calculation, NetworkId } from '@minswap/sdk';

import minswapV2Edges from '@/data/edges/minswap-v2';
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

/**
 * This is required to prevent calling `getAllV2Pools` multiple times per market
 */
adapter.getAllV2Pools = timedCache(
  adapter.getAllV2Pools.bind(adapter),
) as unknown as () => ReturnType<typeof adapter.getAllV2Pools>;
const getPools = timedCache(async (marketId: string) => {
  const [v2PolicyId, v2TokenName] = marketId.split('-');

  return adapter.getV2PoolByLp({
    policyId: v2PolicyId,
    tokenName: v2TokenName,
  });
});

const MinswapV2: Provider = {
  id: 'minswapv2',
  name: 'MinSwapV2',
  type: 'real',
  url: 'https://app.minswap.org/swap',

  async prefetchMarketData() {
    Object.values(minswapV2Edges).map((edge) => getPools(edge.market.id));
  },

  async getExplicitFee(nodeId: ArbitNodeId, amounts: number[]) {
    const node = getNodeById(nodeId);
    const ada = getNodeById('cardano:ADA');
    const [assetPrices, [adaPrice]] = await Promise.all([
      asset2usd(node, amounts),
      asset2usd(ada, [1_000000]),
    ]);
    const maxNetworkFee = 0.89 * adaPrice;
    return assetPrices.map(() => {
      return maxNetworkFee;
    });
  },

  async x2y(marketId: string, amounts: number[]) {
    const pools = (await getPools(marketId))!;

    return amounts.map((amount) => {
      const out = DexV2Calculation.calculateAmountOut({
        amountIn: BigInt(amount),
        reserveIn: pools.reserveA,
        reserveOut: pools.reserveB,
        tradingFeeNumerator: pools.feeA[0],
      });
      return Number(out);
    });
  },

  async y2x(marketId: string, amounts: number[]) {
    const pools = (await getPools(marketId))!;

    return amounts.map((amount) => {
      const out = DexV2Calculation.calculateAmountOut({
        amountIn: BigInt(amount),
        reserveIn: pools.reserveB,
        reserveOut: pools.reserveA,
        tradingFeeNumerator: pools.feeB[0],
      });
      return Number(out);
    });
  },
};

export default MinswapV2;
