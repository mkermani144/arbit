import { connection } from 'next/server';

import HeroPrice from '@/components/hero-price';
import Step from '@/components/step';
import { buildGraph, getFrontendArbitData } from '@/services/graph';

const App = async () => {
  await buildGraph();

  await connection();

  const { steps, profit } = await getFrontendArbitData();

  return (
    <>
      <div className="flex items-end gap-2">
        <HeroPrice usd={profit.usd} percent={profit.percent} />
      </div>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Top profit right now. All fees are considered based on a best guess.
        Take care of slippage.
      </p>
      <div className="flex flex-col lg:flex-row mt-8 gap-4">
        {steps.map((step) => {
          return (
            <Step
              key={step.id}
              fromToken={step.from.token.name}
              fromAmount={step.from.amount}
              toToken={step.to.token.name}
              toAmount={step.to.amount}
              providerName={step.provider.name}
              providerLink={step.provider.url}
              stepProfit={step.profit}
              stepFee={step.fee}
            />
          );
        })}
      </div>
    </>
  );
};

export default App;
