# Arbit

Arbit makes arbitrage simple.

## Usage

You need supported tokens (ERG, ADA, and RSN) on Ergo and Cardano chains. To bridge assets, use [Rosen Bridge](https://app.rosen.tech).
Once you have tokens ready, visit the app periodically. If an opportunity exists, execute the swap simultaneously.
It's that straightforward.

## The Why

Great arbitrage software already exists. So why create another one?
The answer is simplicity. How easy is it to set up an arbitrage bot for someone with basic blockchain knowledge who has only used a wallet to buy or sell assets?
We developed Arbit to be simple. Look at the UI: no distractions, no complexity—just buttons for swapping tokens to earn profit. The profit is clear. In our MVP, we show only the most profitable Arbit.

## "Arbits"

An "Arbit" is a set of swaps resulting in profit. Imagine selling 100 X on FooSwap for $100, then buying 105 wrappedX on BarSwap with the same $100, earning $5. This entire process is an Arbit.

## How It Works

We have a predefined set of Arbits—currently ERG<->ADA and RSN<->ADA, using Ergo Dex, Splash, and Minswap. We consider Arbits in both directions and calculate their profits.

We calculate profit for fixed USD values ($50 and $100). We don't optimize token amounts for maximum profit; that would complicate things.

For example, with $50, we:

- Sell $50 equivalent rsADA on Ergo Dex
- Buy ERG
- Sell rsERG on Splash, hoping for more ADA

We repeat this for $100 (and other fixed amounts), then do the same in the opposite direction. The process is repeated for all supported Arbits. The top profitable Arbit appears in the UI. If none is profitable, we display $0.

## Local Deployment

1. Create a `.env` file with:

   - `SPLASH_API_URL`: Splash API (discovered via Chrome's network tab, as their docs are empty)
   - `ERGO_EXPLORER_API_URL`: Ergo Explorer API
   - `BLOCKFROST_PROJECT_ID`: Blockfrost project id (for Minswap)

2. Run the development build:
   ```
   pnpm run dev
   ```

## Team

The MVP was developed through [ConnecMent](https://github.com/ConnecMent).  
Mentors: [@mkermani144](https://github.com/mkermani144), [@fatemeh-ra](https://github.com/fatemeh-ra)  
Mentee: [@SeyedMojtaba1](https://github.com/SeyedMojtaba1)

Special thanks to [@zargarzadehm](https://github.com/zargarzadehm) for Ergo Dex SDK insights.

<sub>Note: This text is written by a human, and improved via [Claude](https://claude.ai/).</sub>
