import { makeNativePools, makeTokenPools } from '@patternglobal/ergo-dex-sdk';
import { AssetAmount, Explorer, RustModule } from '@patternglobal/ergo-sdk';

import { asset2usd, timedCache } from '@/lib/utils';
import { getNodeById } from '@/repositories/node';
import { ArbitNodeId, Provider } from '@/types/core';

await RustModule.load(true);

const explorer = new Explorer(process.env.ERGO_EXPLORER_API_URL!);
const getPool = timedCache(async (marketId: string) => {
  const nativePools = makeNativePools(explorer);
  const tokenPools = makeTokenPools(explorer);

  const pool = (
    await Promise.all([nativePools.get(marketId), tokenPools.get(marketId)])
  ).find(Boolean)!;

  return pool;
});

const ErgoDex: Provider = {
  id: 'ergodex',
  name: 'ErgoDex',
  type: 'real',
  url: 'https://ergodex.io',

  async getExplicitFee(nodeId: ArbitNodeId, amounts: number[]) {
    const node = getNodeById(nodeId);
    const erg = getNodeById('ergo:ERG');
    const [assetPrices, [ergPrice]] = await Promise.all([
      asset2usd(node, amounts),
      asset2usd(erg, [1_000000000]),
    ]);
    return assetPrices.map((amount) => {
      const serviceFee = amount * 0.003 * ergPrice; // 0.3%
      const maxExecutionFee = 0.0072 * ergPrice; // For Nitro of 1.2
      const networkFee = 0.002 * ergPrice;

      return serviceFee + maxExecutionFee + networkFee;
    });
  },

  async x2y(marketId: string, amounts: number[]) {
    const pool = await getPool(marketId);
    return amounts.map((amount) => {
      const outputAmount = pool.outputAmount({
        amount,
        asset: pool.assetX,
      } as unknown as AssetAmount);

      if (!outputAmount?.amount || outputAmount.asset.decimals == null) {
        throw new Error('Output amount or decimals is unexpected');
      }

      return Number(outputAmount.amount);
    });
  },

  async y2x(marketId: string, amounts: number[]) {
    const pool = await getPool(marketId);
    return amounts.map((amount) => {
      const outputAmount = pool.outputAmount({
        amount,
        asset: pool.assetY,
      } as unknown as AssetAmount);

      if (!outputAmount?.amount || outputAmount.asset.decimals == null) {
        throw new Error('Output amount or decimals is unexpected');
      }

      return Number(outputAmount.amount);
    });
  },
};

export default ErgoDex;
