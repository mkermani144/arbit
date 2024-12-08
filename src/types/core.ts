export interface AmountWithDecimal {
  amount: bigint;
  decimals: number;
}

/**
 * A provider is anything that have markets for swapping pairs (e.g. Uniswap is
 * a provider and its LPs are the markets)
 */
export interface Provider {
  x2y(marketId: string, amount: AmountWithDecimal): Promise<AmountWithDecimal>;
  y2x(marketId: string, amount: AmountWithDecimal): Promise<AmountWithDecimal>;
}

/**
 * To link all markets in a arbitrategy chain we use swap type:
 * - x2y: sell token X and buy token Y in this market
 * - y2x: sell token Y and buy token X in this market
 *
 * @example
 * For this chain:
 * --ETH/BTC->ETH/USDT->USDT/USDC->BTC/USDC--
 * We have these swaps:
 * --y2x->x2y->x2y->y2x
 */
export type SwapType = "x2y" | "y2x";

/**
 * A link is a piece in the arbitrategy chain, containing provider, market id
 * (e.g. LP id) and its mapping type
 *
 * @example
 * const link: Link = {
 *   providerId: 'uniswap',
 *   marketId: 'awesomeLP',
 *   mapping: 'xx',
 * }
 */
export interface Link {
  providerId: string;
  marketId: string;
  swapType: SwapType;
}

/**
 * An arbitrategy chain is a complete set of markets (possibly on different
 * providers) that we manipulate to earn profit
 */
export type ArbitrategyChain = Link[];

/**
 * Arbitrategy indicates a set of chains that we are going to manipulate
 */
export type Arbitrategy = ArbitrategyChain[];
