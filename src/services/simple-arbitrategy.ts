import simpleArbitrategy from '@/arbitrategy';
import { computeArbitrategyProfit } from '@/lib/arbit-core';

export const computeSimpleArbitrategyProfit = () =>
  computeArbitrategyProfit(simpleArbitrategy);
