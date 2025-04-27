import { providerMap } from '@/providers/providers-map';
import { getEdgeById } from '@/repositories/edge';
import { getNodeById } from '@/repositories/node';
import { ArbitNode, GraphRepresentedArbit, Provider } from '@/types/core';
import { asset2usd } from '@/lib/utils';

export const humanizeGraphRepresentedArbit = async (
  arbit: GraphRepresentedArbit,
) => {
  const steps = await Promise.all(
    arbit.arbit
      .reduce(
        (currentSteps, { edgeId, optimalInput, fee }, index) => {
          const edge = getEdgeById(edgeId);
          const edgeProvider = providerMap.get(edge.market.provider);

          const lastNode = currentSteps.length
            ? currentSteps.at(-1)!.to.token.id
            : arbit.arbitStart;

          const fromToken = getNodeById(
            lastNode === edge.nodes.x ? edge.nodes.x : edge.nodes.y,
          );
          const toToken = getNodeById(
            lastNode === edge.nodes.x ? edge.nodes.y : edge.nodes.x,
          );

          const nextAmount =
            index === arbit.arbit.length - 1
              ? arbit.finalOutput
              : arbit.arbit[index + 1].optimalInput;

          // Calculate raw values with proper decimals
          const fromAmountRaw = optimalInput;
          const toAmountRaw = nextAmount;

          // Calculate human-readable amounts
          const fromAmount = optimalInput / 10 ** fromToken.decimals;
          const toAmount = nextAmount / 10 ** toToken.decimals;

          return [
            ...currentSteps,
            {
              id: edgeId,
              from: {
                token: fromToken,
                amount: fromAmount,
                amountRaw: fromAmountRaw,
              },
              to: {
                token: toToken,
                amount: toAmount,
                amountRaw: toAmountRaw,
              },
              provider: {
                name: edgeProvider!.name,
                url: edgeProvider!.url,
                type: edgeProvider!.type,
              },
              fee: {
                usd: fee,
              },
            },
          ];
        },
        [] as {
          id: string;
          from: {
            token: ArbitNode;
            amount: number;
            amountRaw: number;
          };
          to: {
            token: ArbitNode;
            amount: number;
            amountRaw: number;
          };
          provider: {
            name: string;
            url: string;
            type: Provider['type'];
          };
          fee: {
            usd: number;
          };
        }[],
      )
      .filter((step) => step.provider.type === 'real')
      .map(async (step) => {
        try {
          const [[fromUsd], [toUsd]] = await Promise.all([
            asset2usd(step.from.token, [step.from.amountRaw]),
            asset2usd(step.to.token, [step.to.amountRaw]),
          ]);

          const profitUsd = toUsd - fromUsd;

          return {
            ...step,
            profit: {
              usd: profitUsd,
              percent: (profitUsd / fromUsd) * 100,
            },
          };
        } catch {
          return {
            ...step,
            profit: {
              usd: 0,
              percent: 0,
            },
          };
        }
      }),
  );

  return {
    steps,
    profit: {
      usd: arbit.profitUsd,
      percent: (arbit.profitUsd / arbit.fund) * 100,
    },
  };
};
