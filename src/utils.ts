import { AmountWithDecimal } from "./types/core";

export const asset2usd = (
  assetId: string,
  amount: AmountWithDecimal
): Promise<number> => {
  return Promise.resolve(0);
};

export const usd2asset = (
  assetId: string,
  usd: number
): Promise<AmountWithDecimal> => {
  return Promise.resolve({
    amount: BigInt(0),
    decimals: 0,
  });
};
