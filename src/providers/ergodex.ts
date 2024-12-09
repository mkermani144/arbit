import { Provider } from "@/types/core";
import { AmmPool, makeNativePools, Pools } from "@ergolabs/ergo-dex-sdk";
import { AssetAmount, Explorer, RustModule } from "@ergolabs/ergo-sdk";

await RustModule.load();

class ErgoDex implements Provider {
  private pools: Pools<AmmPool>;

  constructor(url: string) {
    this.pools = makeNativePools(new Explorer(url));
  }

  async x2y(marketId: string, amount: number) {
    const pool = await this.pools.get(marketId);
    const outputAmount = await pool?.outputAmount({
      amount,
      asset: pool.assetX,
    } as unknown as AssetAmount);

    if (!outputAmount?.amount || outputAmount.asset.decimals == null) {
      throw new Error("Output amount or decimals is unexpected");
    }

    return Number(outputAmount.amount);
  }

  async y2x(marketId: string, amount: number) {
    const pool = await this.pools.get(marketId);
    const outputAmount = await pool?.outputAmount({
      amount,
      asset: pool.assetY,
    } as unknown as AssetAmount);

    if (!outputAmount?.amount || outputAmount.asset.decimals == null) {
      throw new Error("Output amount or decimals is unexpected");
    }

    return Number(outputAmount.amount);
  }
}

export default ErgoDex;
