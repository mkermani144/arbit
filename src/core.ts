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

  private fundRangeInUsd = [50, 75, 100, 150, 200, 300, 500];

  /**
   * Trade assets on the specified link
   * @param link
   * @param tradeInput asset amount to trade
   * @returns the trade link
   */
  trade = async (link: Link, tradeInput: number): Promise<TradeLink> => {
    const provider = this.providerMap.get(link.providerId)!;
    const tradeOutput = await provider[link.swapType](
      link.marketId,
      tradeInput,
    );
    return {
      ...link,
      input: tradeInput,
      output: tradeOutput,
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
  computeArbitProfit = async (
    arbit: Arbit,
    fund: number,
  ): Promise<ArbitResult> => {
    // Find the primary asset
    const startingLink = arbit[0];
    const primaryAsset =
      startingLink.swapType == 'x2y' ? startingLink.x : startingLink.y;
    // Calculate starting amount based on the specified fund
    const startingAssetAmount = await usd2asset(primaryAsset, fund);
    // Create the trade path and trade assets based on arbit
    let assetAmount = startingAssetAmount;
    const finalTradePath: TradePath = [];
    for (const link of arbit) {
      const tradeLink = await this.trade(link, assetAmount);
      assetAmount = tradeLink.output;
      finalTradePath.push(tradeLink);
    }
    // Compute profit
    const profitUsd = await asset2usd(
      primaryAsset,
      assetAmount - startingAssetAmount,
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
     * - Splash: Order book matching fee is 0.1 ADA + 0.05%. Network fee is at
     * most 0.2 ADA, and execution fee is around 1 ADA.
     *
     * In total: 0.35% + 1.3 ADA ~= 0.35% + $2.5 (conservative)
     */
    const netProfitUsd = profitUsd - fund * 0.0035 - 2.5;
    const profit: Profit = {
      usd: netProfitUsd,
      percent: (netProfitUsd / fund) * 100,
    };
    return {
      tradePath: finalTradePath,
      profit: profit,
    };
  };

  /**
   * Checks all arbits with different funds
   * @returns the final result of the arbitrategy
   */
  start = async () => {
    const arbitFinalResult: ArbitResult[] = [];
    for (const arbit of this.arbitrategy) {
      // Check each arbit profit with different funds
      let bestArbitResult: ArbitResult | undefined;
      for (const fundInUsd of this.fundRangeInUsd) {
        const result = await this.computeArbitProfit(arbit, fundInUsd);
        if (!bestArbitResult || bestArbitResult.profit.usd < result.profit.usd)
          bestArbitResult = result;
      }
      arbitFinalResult.push(bestArbitResult!);
    }
    return arbitFinalResult;
  };
}
