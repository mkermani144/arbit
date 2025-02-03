import { asset2usd, timedCache } from '@/lib/utils';
import { getNodeById } from '@/repositories/node';
import { ArbitNodeId, Provider } from '@/types/core-v2';

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
  id: 'splash',
  name: 'Splash',
  type: 'real',

  getExplicitFee: async (nodeId: ArbitNodeId, amounts: number[]) => {
    const node = getNodeById(nodeId);
    const ada = getNodeById('cardano:ADA');
    const assetPrices = await asset2usd(node, amounts);
    const [adaPrice] = await asset2usd(ada, [1_000000]);
    const serviceFee = 1 * adaPrice;
    const maxNetworkFee = 0.2 * adaPrice;
    return assetPrices.map(() => {
      return serviceFee + maxNetworkFee;
    });
  },

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
