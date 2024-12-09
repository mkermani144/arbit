import { Provider } from "@/types/core";
import { AmmPool, makeNativePools, Pools } from "@ergolabs/ergo-dex-sdk";
import { AssetAmount, Explorer, RustModule } from "@ergolabs/ergo-sdk";

type Order = {
  price: string;
  avgPrice: string;
  ordersLiquidity: string;
  poolsLiquidity: string;
  accumulatedLiquidity: string;
  volumeRelation: string;
};

type Pair = {
  base: string;
  quote: string;
};

type OrderBookResponse = {
  pair: Pair;
  asks: Order[];
  bids: Order[];
  spot: string;
  previousSpot: string;
  ammTotalLiquidityBase: string;
  ammTotalLiquidityQuote: string;
};

class Splash implements Provider {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async getOrderBook(marketId: string): Promise<OrderBookResponse> {
    const response = await fetch(
      `${this.baseUrl}/platform-api/v1/trading-view/order-book?base=${marketId}&quote=.`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data as OrderBookResponse;
  }

  async x2y(marketId: string, amount: number) {
    const orderBook = await this.getOrderBook(marketId);

    const ask = orderBook.asks[0].price;

    return amount / Number(ask);
  }

  async y2x(marketId: string, amount: number) {
    const orderBook = await this.getOrderBook(marketId);

    const bid = orderBook.bids[0].price;

    return amount * Number(bid);
  }
}

export default Splash;
