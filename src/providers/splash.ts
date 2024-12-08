import { AmountWithDecimal, Provider } from "@/types/core";
import { AmmPool, makeNativePools, Pools } from "@ergolabs/ergo-dex-sdk";
import { AssetAmount, Explorer, RustModule } from "@ergolabs/ergo-sdk";
import axios from "axios";

class Splash implements Provider {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async getOrderBook(marketId: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/platform-api/v1/trading-view/order-book`,
        {
          params: { base: marketId, quote: "." },
        }
      );
      response.data;
      return response.data;
    } catch (error) {
      console.error("Error fetching order book:", error);
      throw new Error("Failed to fetch order book");
    }
  }

  async x2y(marketId: string, amount: AmountWithDecimal) {
    const orderBook = await this.getOrderBook(marketId);

    const spot = orderBook.spot;

    return {
      amount: spot.toFixed(amount.decimals),
      decimals: amount.decimals,
    };
  }

  async y2x(marketId: string, amount: AmountWithDecimal) {
    const orderBook = await this.getOrderBook(marketId);

    const spot = orderBook.spot;

    return {
      amount: spot.toFixed(amount.decimals),
      decimals: amount.decimals,
    };
  }
}

export default Splash;
