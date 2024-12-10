import simpleArbitrategy from "@/arbitrategy";
import { ArbitCore } from "@/core";

import ErgoDex from "@/providers/ergodex";
import Splash from "@/providers/splash";

import GithubRepo from "@/components/github-repo";
import HeroPrice from "@/components/hero-price";
import { ModeToggle } from "@/components/mode-toggle";
import Step from "@/components/step";

import { Provider } from "@/types/core";

const providers: Record<string, { name: string; link: string }> = {
  ergodex: {
    name: "ErgoDex",
    link: "https://ergodex.io",
  },
  splash: {
    name: "Splash",
    link: "https://splash.trade",
  },
};

export default async function Home() {
  const arbitResults = new ArbitCore(
    simpleArbitrategy,
    new Map<string, Provider>([
      ["ergodex", new ErgoDex("https://api.ergoplatform.com")],
      ["splash", new Splash("https://api5.splash.trade")],
    ])
  );

  const allArbitResults = await arbitResults.start();
  const topProfitableResult = allArbitResults.reduce(
    (topCandidate, arbitResult) =>
      arbitResult.profit.usd > topCandidate.profit.usd
        ? arbitResult
        : topCandidate,
    /**
     * Instead of showing zero, we should show an empty screen if no arbit is
     * profitable
     * https://github.com/ConnecMent/arbit/issues/31
     */
    { profit: { usd: 0, percent: 0 }, tradePath: [] }
  );

  return (
    <div className="flex h-screen w-full items-center justify-center flex-col px-4">
      <div className="fixed top-4 left-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Arbit
        </h3>
      </div>
      <div className="fixed top-4 right-4">
        <div className="flex gap-2">
          <ModeToggle />
          <GithubRepo />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <HeroPrice
          usd={topProfitableResult.profit.usd}
          percent={topProfitableResult.profit.percent}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        Top profit right now. All fees are considered based on a best guess.
        Take care of slippage.
      </p>
      <div className="flex mt-8 gap-4">
        {topProfitableResult.tradePath.map((tradeLink) => {
          const fromToken =
            tradeLink.swapType === "x2y" ? tradeLink.x : tradeLink.y;
          const toToken =
            tradeLink.swapType === "x2y" ? tradeLink.y : tradeLink.x;

          return (
            <Step
              key={tradeLink.marketId}
              fromToken={fromToken.name}
              fromAmount={tradeLink.input / 10 ** fromToken.decimals}
              toToken={toToken.name}
              toAmount={tradeLink.output / 10 ** toToken.decimals}
              providerName={providers[tradeLink.providerId].name}
              providerLink={providers[tradeLink.providerId].link}
            />
          );
        })}
      </div>
    </div>
  );
}
