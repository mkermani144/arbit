import { Provider } from '@/types/core';
import {
  AmmPool,
  makeNativePools,
  makeTokenPools,
  Pools,
} from '@patternglobal/ergo-dex-sdk';
import { AssetAmount, Explorer, RustModule } from '@patternglobal/ergo-sdk';

await RustModule.load(true);

class ErgoDex implements Provider {
  private nativePools: Pools<AmmPool>;
  private tokenPools: Pools<AmmPool>;

  constructor(url: string) {
    this.nativePools = makeNativePools(new Explorer(url));
    this.tokenPools = makeTokenPools(new Explorer(url));
  }

  async x2y(marketId: string, amounts: number[]) {
    const pool = (
      await Promise.all([
        this.nativePools.get(marketId),
        this.tokenPools.get(marketId),
      ])
    ).find(Boolean)!;
    return Promise.all(
      amounts.map(async (amount) => {
        const outputAmount = await pool.outputAmount({
          amount,
          asset: pool.assetX,
        } as unknown as AssetAmount);

        if (!outputAmount?.amount || outputAmount.asset.decimals == null) {
          throw new Error('Output amount or decimals is unexpected');
        }

        return Number(outputAmount.amount);
      }),
    );
  }

  async y2x(marketId: string, amounts: number[]) {
    const pool = (
      await Promise.all([
        this.nativePools.get(marketId),
        this.tokenPools.get(marketId),
      ])
    ).find(Boolean)!;
    return Promise.all(
      amounts.map(async (amount) => {
        const outputAmount = await pool.outputAmount({
          amount,
          asset: pool.assetY,
        } as unknown as AssetAmount);

        if (!outputAmount?.amount || outputAmount.asset.decimals == null) {
          throw new Error('Output amount or decimals is unexpected');
        }

        return Number(outputAmount.amount);
      }),
    );
  }
}

export default ErgoDex;
