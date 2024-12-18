import simpleArbitrategy from '@/arbitrategy';
import { ArbitCore } from '@/core';

import ErgoDex from '@/providers/ergodex';
import Splash from '@/providers/splash';

import HeroPrice from '@/components/hero-price';
import Step from '@/components/step';

import { Provider } from '@/types/core';

const providers: Record<string, { name: string; link: string }> = {
  ergodex: {
    name: 'ErgoDex',
    link: 'https://ergodex.io',
  },
  splash: {
    name: 'Splash',
    link: 'https://app.splash.trade',
  },
};

const App = async () => {
  const arbitResults = new ArbitCore(
    simpleArbitrategy,
    new Map<string, Provider>([
      ['ergodex', new ErgoDex(process.env.ERGO_EXPLORER_API_URL!)],
      ['splash', new Splash(process.env.SPLASH_API_URL!)],
    ]),
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
    { profit: { usd: 0, percent: 0 }, tradePath: [] },
  );
  return (
    <>
      <div className="flex items-end gap-2">
        <HeroPrice
          usd={topProfitableResult.profit.usd}
          percent={topProfitableResult.profit.percent}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Top profit right now. All fees are considered based on a best guess.
        Take care of slippage.
      </p>
      <div className="flex flex-col lg:flex-row mt-8 gap-4">
        {topProfitableResult.tradePath.map((tradeLink) => {
          const fromToken =
            tradeLink.swapType === 'x2y' ? tradeLink.x : tradeLink.y;
          const toToken =
            tradeLink.swapType === 'x2y' ? tradeLink.y : tradeLink.x;

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
    </>
  );
};

export default App;
