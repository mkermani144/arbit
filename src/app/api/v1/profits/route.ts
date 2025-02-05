import { NextResponse } from 'next/server';

import { FUNDS_RANGE } from '@/constants';
import { buildGraph, findOptimalArbits } from '@/services/graph';

export const GET = async () => {
  try {
    await buildGraph();

    const optimalArbits = await findOptimalArbits(FUNDS_RANGE);

    return NextResponse.json(
      optimalArbits.map((arbit) => ({
        ...arbit,
        finalOutput: arbit.finalOutput.toString(),
        path: arbit.path.map((link) => ({
          edgeId: link.edgeId,
          optimalInput: link.optimalInput.toString(),
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
