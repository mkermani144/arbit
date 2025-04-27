import { NextResponse } from 'next/server';

import { FUNDS_RANGE } from '@/constants';
import { buildGraph, findOptimalArbits } from '@/services/graph';
import { humanizeGraphRepresentedArbit } from '@/utils/graph/humanizeGraphRepresentedArbit';

export const GET = async () => {
  try {
    await buildGraph();

    const optimalArbits = await findOptimalArbits(FUNDS_RANGE);

    const humanizedArbits = await Promise.all(
      optimalArbits.map(humanizeGraphRepresentedArbit),
    );

    return NextResponse.json(
      humanizedArbits
        .sort((a, b) => (a.profit.percent < b.profit.percent ? 1 : -1))
        .map((arbit) => ({
          ...arbit,
          steps: arbit.steps.map((step) => ({
            ...step,
            from: {
              ...step.from,
              amount: step.from.amount.toString(),
              amountRaw: undefined,
            },
            to: {
              ...step.to,
              amount: step.to.amount.toString(),
              amountRaw: undefined,
            },
          })),
        })),
    );
  } catch {
    return NextResponse.json(
      'Cannot compute optimal arbit for an unknown reason',
      { status: 500 },
    );
  }
};
