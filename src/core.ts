import {
  Arbitrategy,
  Arbit,
  ArbitResult,
  Link,
  Profit,
  Provider,
  TradeLink,
  TradePath,
} from './types/core';
import { asset2usd, usd2asset } from './utils';

export class ArbitCore {
  constructor(
    private arbitrategy: Arbitrategy,
    private providerMap: Map<string, Provider>,
  ) {}

  /**
   * All numbers in the range 20-500, with a distance of 0.1 (e.g. 20-20.1-...)
   */
  private fundsInUsd = Array.from({ length: 481 }).flatMap((_, index) =>
    Array.from({ length: 10 }).map(
      (_, innerIndex) => index + 20 + 0.1 * innerIndex,
    ),
  );

  /**
   * Trade assets on the specified link
   * @param link
   * @param tradeInputs asset amounts to trade
   * @returns the trade link
   */
  trade = async (link: Link, tradeInputs: number[]): Promise<TradeLink> => {
    const provider = this.providerMap.get(link.providerId)!;
    const tradeOutputs = await provider[link.swapType](
      link.marketId,
      tradeInputs,
    );
    return {
      ...link,
      input: tradeInputs,
      output: tradeOutputs,
    };
  };

  /**
   * Execute the arbit with the specified fund and compute the results
   * The arbit is profitable if the primary asset is increased after completing
   * the trades
   *
   * @param arbit
   * @param fund
   * @returns the arbit result including trading path and profit
   */
  computeArbitProfit = async (arbit: Arbit): Promise<ArbitResult> => {
    // Find the primary asset
    const startingLink = arbit[0];
    const primaryAsset =
      startingLink.swapType == 'x2y' ? startingLink.x : startingLink.y;
    // Calculate starting amount based on the specified fund
    const startingAssetAmounts = await usd2asset(primaryAsset, this.fundsInUsd);
    // Create the trade path and trade assets based on arbit
    let assetAmounts = startingAssetAmounts;
    const finalTradePath: TradePath = [];
    for (const link of arbit) {
      const tradeLink = await this.trade(link, assetAmounts);
      assetAmounts = tradeLink.output;
      finalTradePath.push(tradeLink);
    }
    // Compute profit
    const profitUsds = await asset2usd(
      primaryAsset,
      assetAmounts.map(
        (assetAmount, index) => assetAmount - startingAssetAmounts[index],
      ),
    );
    /**
     * FIXME: This method for calculating fees is imprecise and just a best
     * guess.
     * https://github.com/ConnecMent/arbit/issues/5
     *
     * Algorithm:
     * - Ergo Dex: The LP fee is considered in the SDK. The execution and
     * network fees can be omitted due to being quite small, and service fee is
     * 0.3%.
     * - Splash: Order book matching fee is calculated in the order book.
     * Network fee is at most 0.2 ADA, and execution fee is around 1 ADA.
     * - Minswap: Batcher fee is 2 ADA, network fee is 0.2 ADA and other fees
     * are considered in the SDK.
     *
     * In short:
     * Ergo Dex: 0.3%
     * Splash: 1.2 ADA
     * Minswap: 2.2 ADA
     */
    const [adaPrice] = await asset2usd(
      {
        coingeckoId: 'cardano',
        decimals: 6,
        name: 'ada',
      },
      [1000000],
    );
    const netProfitUsds = profitUsds.map((profitUsd, index) => {
      const includesErgoDexLink = arbit.some(
        (link) => link.providerId === 'ergodex',
      );
      const includesSplashLink = arbit.some(
        (link) => link.providerId === 'splash',
      );
      const includesMinswapLink = arbit.some(
        (link) => link.providerId === 'minswap',
      );
      const feesToConsider =
        (+includesErgoDexLink && 0.003 * this.fundsInUsd[index]) +
        (+includesSplashLink && 1.2 * adaPrice) +
        (+includesMinswapLink && 2.2 * adaPrice);

      return profitUsd - feesToConsider;
    });
    const maxNetProfitUsd = netProfitUsds.reduce((max, cur) =>
      Math.max(max, cur),
    );
    const optimalIndex = netProfitUsds.findIndex(
      (netProfitUsd) => maxNetProfitUsd === netProfitUsd,
    )!;
    const optimalFund = this.fundsInUsd[optimalIndex];
    const profit: Profit = {
      usd: maxNetProfitUsd,
      percent: (maxNetProfitUsd / optimalFund) * 100,
    };
    return {
      tradePath: finalTradePath,
      profit: profit,
      optimalIndex,
    };
  };

  /**
   * Checks all arbits with different funds
   * @returns the final result of the arbitrategy
   */
  start = async () => {
    const arbitResults = await Promise.all(
      this.arbitrategy.map(this.computeArbitProfit),
    );
    return arbitResults;
  };
}
