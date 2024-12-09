import { Arbitrategy } from "./types/core";

/**
 * ErgoDex: ERG/rsADA
 * Splash: ADA/rsERG
 */
const adaErgArbitrategy: Arbitrategy = [
  [
    {
      providerId: "ergodex",
      swapType: "y2x",
      marketId:
        "ae97c5eccd59a065cd973a8d6afb8bb79f9cc70368a7dcdf73aaeab1cedf6f6b",
      x: {
        name: "erg",
        coingeckoId: "ergo",
        decimals: 9,
      },
      y: {
        name: "ada",
        coingeckoId: "cardano",
        decimals: 6,
      },
    },
    {
      providerId: "splash",
      swapType: "y2x",
      marketId:
        "ececc92aeaaac1f5b665f567b01baec8bc2771804b4c21716a87a4e3.53504c415348",
      x: {
        name: "ada",
        coingeckoId: "cardano",
        decimals: 6,
      },
      y: {
        name: "erg",
        coingeckoId: "ergo",
        decimals: 9,
      },
    },
  ],

  [
    {
      providerId: "splash",
      swapType: "x2y",
      marketId:
        "ececc92aeaaac1f5b665f567b01baec8bc2771804b4c21716a87a4e3.53504c415348",
      x: {
        name: "ada",
        coingeckoId: "cardano",
        decimals: 6,
      },
      y: {
        name: "erg",
        coingeckoId: "ergo",
        decimals: 9,
      },
    },
    {
      providerId: "ergodex",
      swapType: "x2y",
      marketId:
        "ae97c5eccd59a065cd973a8d6afb8bb79f9cc70368a7dcdf73aaeab1cedf6f6b",
      x: {
        name: "erg",
        coingeckoId: "ergo",
        decimals: 9,
      },
      y: {
        name: "ada",
        coingeckoId: "cardano",
        decimals: 6,
      },
    },
  ],
];

/**
 * ErgoDex: RSN/rsADA
 * Splash: ADA/rsRSN
 */
const adaRsnArbitrategy: Arbitrategy = [
  [
    {
      providerId: "ergodex",
      swapType: "y2x",
      marketId:
        "29f45df2736a7c7dd790b682fb15429961d7c1ae92e05c72a4f65d53fc0c47d7",
      x: {
        name: "rsn",
        coingeckoId: "rosen-bridge",
        decimals: 3,
      },
      y: {
        name: "ada",
        coingeckoId: "cardano",
        decimals: 6,
      },
    },
    {
      providerId: "splash",
      swapType: "y2x",
      marketId:
        "04b95368393c821f180deee8229fbd941baaf9bd748ebcdbf7adbb14.727352534e",
      x: {
        name: "ada",
        coingeckoId: "cardano",
        decimals: 6,
      },
      y: {
        name: "rsn",
        coingeckoId: "rosen-bridge",
        decimals: 3,
      },
    },
  ],
  [
    {
      providerId: "splash",
      swapType: "x2y",
      marketId:
        "04b95368393c821f180deee8229fbd941baaf9bd748ebcdbf7adbb14.727352534e",
      x: {
        name: "ada",
        coingeckoId: "cardano",
        decimals: 6,
      },
      y: {
        name: "rsn",
        coingeckoId: "rosen-bridge",
        decimals: 3,
      },
    },
    {
      providerId: "ergodex",
      swapType: "x2y",
      marketId:
        "29f45df2736a7c7dd790b682fb15429961d7c1ae92e05c72a4f65d53fc0c47d7",
      x: {
        name: "rsn",
        coingeckoId: "rosen-bridge",
        decimals: 3,
      },
      y: {
        name: "ada",
        coingeckoId: "cardano",
        decimals: 6,
      },
    },
  ],
];

const simpleArbitrategy: Arbitrategy = [
  ...adaErgArbitrategy,
  ...adaRsnArbitrategy,
];

export default simpleArbitrategy;
