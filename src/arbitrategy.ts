import { Arbitrategy } from "./types/core";

const adaErgArbitrategy: Arbitrategy = [
  [
    {
      providerId: "ergodex",
      swapType: "y2x",
      marketId:
        "ae97c5eccd59a065cd973a8d6afb8bb79f9cc70368a7dcdf73aaeab1cedf6f6b",
      x: {
        name: "ERG",
        coingeckoId: "ergo",
        decimals: 9,
      },
      y: {
        name: "rsADA",
        coingeckoId: "cardano",
        decimals: 6,
      },
    },
    {
      providerId: "splash",
      swapType: "x2y",
      marketId:
        "04b95368393c821f180deee8229fbd941baaf9bd748ebcdbf7adbb14.7273455247",
      x: {
        name: "rsERG",
        coingeckoId: "ergo",
        decimals: 9,
      },
      y: {
        name: "ADA",
        coingeckoId: "cardano",
        decimals: 6,
      },
    },
  ],

  [
    {
      providerId: "splash",
      swapType: "y2x",
      marketId:
        "04b95368393c821f180deee8229fbd941baaf9bd748ebcdbf7adbb14.7273455247",
      x: {
        name: "rsERG",
        coingeckoId: "ergo",
        decimals: 9,
      },
      y: {
        name: "ADA",
        coingeckoId: "cardano",
        decimals: 6,
      },
    },
    {
      providerId: "ergodex",
      swapType: "x2y",
      marketId:
        "ae97c5eccd59a065cd973a8d6afb8bb79f9cc70368a7dcdf73aaeab1cedf6f6b",
      x: {
        name: "ERG",
        coingeckoId: "ergo",
        decimals: 9,
      },
      y: {
        name: "rsADA",
        coingeckoId: "cardano",
        decimals: 6,
      },
    },
  ],
];

const adaRsnArbitrategy: Arbitrategy = [
  [
    {
      providerId: "ergodex",
      swapType: "y2x",
      marketId:
        "29f45df2736a7c7dd790b682fb15429961d7c1ae92e05c72a4f65d53fc0c47d7",
      x: {
        name: "RSN",
        coingeckoId: "rosen-bridge",
        decimals: 3,
      },
      y: {
        name: "rsADA",
        coingeckoId: "cardano",
        decimals: 6,
      },
    },
    {
      providerId: "splash",
      swapType: "x2y",
      marketId:
        "04b95368393c821f180deee8229fbd941baaf9bd748ebcdbf7adbb14.727352534e",
      x: {
        name: "rsRSN",
        coingeckoId: "rosen-bridge",
        decimals: 3,
      },
      y: {
        name: "ADA",
        coingeckoId: "cardano",
        decimals: 6,
      },
    },
  ],
  [
    {
      providerId: "splash",
      swapType: "y2x",
      marketId:
        "04b95368393c821f180deee8229fbd941baaf9bd748ebcdbf7adbb14.727352534e",
      x: {
        name: "rsRSN",
        coingeckoId: "rosen-bridge",
        decimals: 3,
      },
      y: {
        name: "ADA",
        coingeckoId: "cardano",
        decimals: 6,
      },
    },
    {
      providerId: "ergodex",
      swapType: "x2y",
      marketId:
        "29f45df2736a7c7dd790b682fb15429961d7c1ae92e05c72a4f65d53fc0c47d7",
      x: {
        name: "RSN",
        coingeckoId: "rosen-bridge",
        decimals: 3,
      },
      y: {
        name: "rsADA",
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
