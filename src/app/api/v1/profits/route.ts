import { NextResponse } from 'next/server';

import { computeSimpleArbitrategyProfit } from '@/services/simple-arbitrategy';

export const GET = async () => {
  try {
    const allArbitResults = await computeSimpleArbitrategyProfit();

    return NextResponse.json(
      allArbitResults.map((arbitResult) => ({
        ...arbitResult,
        tradePath: arbitResult.tradePath.map((tradeLink) => ({
          ...tradeLink,
          input: tradeLink.input.toString(),
          output: tradeLink.output.toString(),
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
