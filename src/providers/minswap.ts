import { BlockFrostAPI } from '@blockfrost/blockfrost-js';
import {
  BlockfrostAdapter,
  calculateSwapExactIn,
  DexV2Calculation,
  NetworkId,
} from '@minswap/sdk';

import { Provider } from '@/types/core';
import { timedCache } from '@/utils';

const blockFrostApi = new BlockFrostAPI({
  projectId: process.env.BLOCKFROST_PROJECT_ID!,
  network: 'mainnet',
});
const adapter = new BlockfrostAdapter({
  blockFrost: blockFrostApi,
  networkId: NetworkId.MAINNET,
});
const getPools = timedCache(async (marketId: string) => {
  const [v1LPId, v2PolicyId, v2TokenName] = marketId.split('-');

  const [poolsV1, poolsV2] = await Promise.all([
    adapter.getV1PoolById({ id: v1LPId }),
    adapter.getV2PoolByLp({
      policyId: v2PolicyId,
      tokenName: v2TokenName,
    }),
  ]);

  return [poolsV1, poolsV2] as const;
});

const Minswap: Provider = {
  async x2y(marketId: string, amounts: number[]) {
    const [poolsV1, poolsV2] = await getPools(marketId);

    return amounts.map((amount) => {
      let v1Out = 0;
      let v2Out = 0;
      if (poolsV1) {
        const out = calculateSwapExactIn({
          amountIn: BigInt(amount),
          reserveIn: poolsV1.reserveA,
          reserveOut: poolsV1.reserveB,
        });
        v1Out = Number(out.amountOut);
      }
      if (poolsV2) {
        const out = DexV2Calculation.calculateAmountOut({
          amountIn: BigInt(amount),
          reserveIn: poolsV2.reserveA,
          reserveOut: poolsV2.reserveB,
          tradingFeeNumerator: poolsV2.feeA[0],
        });
        v2Out = Number(out);
      }
      return Math.max(v1Out, v2Out);
    });
  },

  async y2x(marketId: string, amounts: number[]) {
    const [poolsV1, poolsV2] = await getPools(marketId);

    return amounts.map((amount) => {
      let v1Out = 0;
      let v2Out = 0;
      if (poolsV1) {
        const out = calculateSwapExactIn({
          amountIn: BigInt(amount),
          reserveIn: poolsV1.reserveB,
          reserveOut: poolsV1.reserveA,
        });
        v1Out = Number(out.amountOut);
      }
      if (poolsV2) {
        const out = DexV2Calculation.calculateAmountOut({
          amountIn: BigInt(amount),
          reserveIn: poolsV2.reserveB,
          reserveOut: poolsV2.reserveA,
          tradingFeeNumerator: poolsV2.feeB[0],
        });
        v2Out = Number(out);
      }
      return Math.max(v1Out, v2Out);
    });
  },
};

export default Minswap;
