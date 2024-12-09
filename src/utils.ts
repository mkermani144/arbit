import { PrimaryAsset } from "./types/core";

export const asset2usd = async (asset: PrimaryAsset, amount: number) => {
  const response: {
    [key: string]: {
      usd: number;
    };
  } = await (
    await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${asset.coingeckoId}&vs_currencies=usd`
    )
  ).json();
  const assetValue = response[asset.coingeckoId].usd;

  return (assetValue * amount) / asset.decimals;
};

export const usd2asset = async (asset: PrimaryAsset, usd: number) => {
  const response: {
    [key: string]: {
      usd: number;
    };
  } = await (
    await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${asset.coingeckoId}&vs_currencies=usd`
    )
  ).json();
  const assetValue = response[asset.coingeckoId].usd;

  return (usd * asset.decimals) / assetValue;
};
