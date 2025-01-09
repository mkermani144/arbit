import { Provider } from '@/types/core';

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
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    return data as OrderBookResponse;
  }

  async x2y(marketId: string, amounts: number[]) {
    const orderBook = await this.getOrderBook(marketId);
    return Promise.all(
      amounts.map(async (amount) => {
        const bid = orderBook.bids.find((bid) => +bid.poolsLiquidity >= amount);

        return +(amount * Number(bid?.price ?? 0)).toFixed(0);
      }),
    );
  }

  async y2x(marketId: string, amounts: number[]) {
    const orderBook = await this.getOrderBook(marketId);
    return Promise.all(
      amounts.map(async (amount) => {
        const ask = orderBook.asks.find(
          (ask) => +ask.poolsLiquidity * +ask.price >= amount,
        );

        return +(amount / Number(ask?.price ?? Infinity)).toFixed(0);
      }),
    );
  }
}

export default Splash;
