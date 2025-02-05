import { NextResponse } from 'next/server';

import { FUNDS_RANGE } from '@/constants';
import { buildGraph, findOptimalArbits } from '@/services/graph';
import { humanizeGraphRepresentedArbit } from '@/utils/humanizeGraphRepresentedArbit';

export const GET = async () => {
  try {
    await buildGraph();

    const optimalArbits = await findOptimalArbits(FUNDS_RANGE);

    return NextResponse.json(
      optimalArbits
        .map(humanizeGraphRepresentedArbit)
        .sort((a, b) => (a.profit.percent < b.profit.percent ? 1 : -1))
        .map((arbit) => ({
          ...arbit,
          steps: arbit.steps.map((step) => ({
            ...step,
            from: {
              ...step.from,
              amount: step.from.amount.toString(),
            },
            to: {
              ...step.to,
              amount: step.to.amount.toString(),
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
