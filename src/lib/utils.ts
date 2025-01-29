import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { AssetInfo } from '@/types/core';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const fetchPrice = async (coingeckoId: string) => {
  const response: {
    [key: string]: {
      usd: number;
    };
  } = await (
    await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`,
      { cache: 'force-cache', next: { revalidate: 60 } },
    )
  ).json();

  return response[coingeckoId].usd;
};

export const asset2usd = async (asset: AssetInfo, assetAmounts: number[]) => {
  const assetValue = await fetchPrice(asset.coingeckoId);

  return assetAmounts.map(
    (amount) => (assetValue * amount) / 10 ** asset.decimals,
  );
};

export const usd2asset = async (asset: AssetInfo, usdAmounts: number[]) => {
  const assetValue = await fetchPrice(asset.coingeckoId);

  return usdAmounts.map(
    (amount) => +((amount * 10 ** asset.decimals) / assetValue).toFixed(0),
  );
};

export const timedCache = <T>(
  fn: (key: string, ...args: unknown[]) => Promise<T>,
  ttlMs = 10000,
) => {
  const cache = new Map<string, { value: Promise<T>; ttl: EpochTimeStamp }>();

  return async (key: string, ...args: unknown[]) => {
    const cacheHit = cache.get(key);
    if (cacheHit && cacheHit.ttl > Date.now()) {
      return await cacheHit?.value;
    }

    const resultPromise = fn(key, ...args);

    cache.set(key, {
      ttl: Date.now() + ttlMs,
      value: resultPromise,
    });

    return await resultPromise;
  };
};
