import { Provider } from '@/types/core';
import { timedCache } from '@/utils';
import { makeNativePools, makeTokenPools } from '@patternglobal/ergo-dex-sdk';
import { AssetAmount, Explorer, RustModule } from '@patternglobal/ergo-sdk';

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
