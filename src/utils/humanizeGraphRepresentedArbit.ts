import { providerMap } from '@/providers/providers-map';
import { getEdgeById } from '@/repositories/edge';
import { getNodeById } from '@/repositories/node';
import { ArbitNode, GraphRepresentedArbit, Provider } from '@/types/core';

export const humanizeGraphRepresentedArbit = (arbit: GraphRepresentedArbit) => {
  const steps = arbit.arbit
    .reduce(
      (currentSteps, { edgeId, optimalInput }, index) => {
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
        return [
          ...currentSteps,
          {
            id: edgeId,
            from: {
              token: fromToken,
              amount: optimalInput / 10 ** fromToken.decimals,
            },
            to: {
              token: toToken,
              amount:
                (index === arbit.arbit.length - 1
                  ? arbit.finalOutput
                  : arbit.arbit[index + 1].optimalInput) /
                10 ** toToken.decimals,
            },
            provider: {
              name: edgeProvider!.name,
              url: edgeProvider!.url,
              type: edgeProvider!.type,
            },
          },
        ];
      },
      [] as {
        id: string;
        from: {
          token: ArbitNode;
          amount: number;
        };
        to: {
          token: ArbitNode;
          amount: number;
        };
        provider: {
          name: string;
          url: string;
          type: Provider['type'];
        };
      }[],
    )
    .filter((step) => step.provider.type === 'real');

  return {
    steps,
    profit: {
      usd: arbit.profitUsd,
      percent: arbit.profitUsd / arbit.fund,
    },
  };
};
