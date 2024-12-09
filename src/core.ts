import {
  AmountWithDecimal,
  Arbitrategy,
  ArbitrategyChain,
  ArbitResult,
  Link,
  Profit,
  Provider,
  TradeLink,
  TradePath,
} from "./types/core";
import { asset2usd, usd2asset } from "./utils";

export class ArbitCore {
  constructor(
    private arbitrategy: Arbitrategy,
    private providerMap: Map<string, Provider>
  ) {}

  private fundRangeInUsd = [50, 100, 200, 500, 750, 1000];

  /**
   * Trade assets on the specified link
   * @param link
   * @param tradeInput asset amount to trade
   * @returns the trade link
   */
  trade = async (
    link: Link,
    tradeInput: AmountWithDecimal
  ): Promise<TradeLink> => {
    const provider = this.providerMap.get(link.providerId)!;
    const tradeOutput = await provider[link.swapType](
      link.marketId,
      tradeInput
    );
    return {
      ...link,
      input: tradeInput,
      output: tradeOutput,
    };
  };

  /**
   * Execute the arbitrategy chain with the specified fund and compute the
   * results
   * The arbitrategy is profitable if the primary asset is increased after
   * completing the trades
   *
   * @param arbitrategyChain
   * @param fund
   * @returns the arbitrategy result including trading path and profit
   */
  computeArbitrategyProfit = async (
    arbitrategyChain: ArbitrategyChain,
    fund: number
  ): Promise<ArbitResult> => {
    // Calculate starting amount based on the specified fund
    const startingAssetAmount = await usd2asset(
      arbitrategyChain.primaryAsset,
      fund
    );
    // Create the trade path and trade assets based on arbitrategy chain
    let assetAmount = startingAssetAmount;
    const finalTradePath: TradePath = [];
    for (const link of arbitrategyChain.chain) {
      const tradeLink = await this.trade(link, assetAmount);
      assetAmount = tradeLink.output;
      finalTradePath.push(tradeLink);
    }
    // Compute profit
    const finalAssetValue = await asset2usd(
      arbitrategyChain.primaryAsset,
      assetAmount
    );
    const profit: Profit = {
      usd: finalAssetValue - fund,
      percent: ((finalAssetValue - fund) / fund) * 100,
    };
    return {
      tradePath: finalTradePath,
      profit: profit,
    };
  };

  /**
   * Checks all arbitrategy chain opportunities with different funds
   * @returns the final result of the arbitrategy
   */
  start = async () => {
    const arbitFinalResult: ArbitResult[] = [];
    for (const arbitrategyChain of this.arbitrategy) {
      // Check each arbitrategy chain profit with different funds
      let bestArbitResult: ArbitResult | undefined;
      for (const fundInUsd of this.fundRangeInUsd) {
        const result = await this.computeArbitrategyProfit(
          arbitrategyChain,
          fundInUsd
        );
        if (
          !bestArbitResult ||
          bestArbitResult.profit.percent < result.profit.percent
        )
          bestArbitResult = result;
      }
      arbitFinalResult.push(bestArbitResult!);
    }
    return arbitFinalResult;
  };
}
