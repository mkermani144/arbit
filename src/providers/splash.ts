import { Provider } from '@/types/core';
import { timedCache } from '@/utils';

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

const getOrderBook = timedCache(async (marketId: string) => {
  const response = await fetch(
    `${process.env.SPLASH_API_URL!}/platform-api/v1/trading-view/order-book?base=${marketId}&quote=.`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await response.json();
  return data as OrderBookResponse;
});

const Splash: Provider = {
  async x2y(marketId: string, amounts: number[]) {
    const orderBook = await getOrderBook(marketId);
    return Promise.all(
      amounts.map(async (amount) => {
        const bid = orderBook.bids.find((bid) => +bid.poolsLiquidity >= amount);

        return +(amount * Number(bid?.price ?? 0)).toFixed(0);
      }),
    );
  },

  async y2x(marketId: string, amounts: number[]) {
    const orderBook = await getOrderBook(marketId);
    return Promise.all(
      amounts.map(async (amount) => {
        const ask = orderBook.asks.find(
          (ask) => +ask.poolsLiquidity * +ask.price >= amount,
        );

        return +(amount / Number(ask?.price ?? Infinity)).toFixed(0);
      }),
    );
  },
};

export default Splash;
