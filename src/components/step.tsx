import { MoveRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StepProps {
  fromToken: string;
  toToken: string;
  fromAmount: number;
  toAmount: number;
  providerName: string;
  providerLink: string;
  stepProfit?: {
    usd: number;
    percent: number;
  };
  stepFee?: {
    usd: number;
  };
}

const Step = ({
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  providerName,
  providerLink,
  stepProfit,
  stepFee,
}: StepProps) => (
  <Card className="w-[300px] lg:w-[350px]">
    <CardHeader>
      <div className="flex flex-row items-center justify-between gap-1">
        {stepProfit && (
          <div className="flex rounded-md overflow-hidden border border-primary/50">
            <div
              className={cn(
                'px-2 py-1 text-sm font-medium text-primary',
                stepProfit.usd > 0
                  ? 'bg-green-950/30 dark:bg-green-200/30'
                  : 'bg-red-950/30 dark:bg-red-200/30',
              )}
            >
              {stepProfit.usd > 0 ? 'P' : 'L'}
            </div>
            <div className="bg-transparent px-2 py-1 text-sm font-medium">
              {stepProfit.usd > 0 ? '+' : '-'}$
              {Math.abs(stepProfit.usd).toFixed(2)}{' '}
              <span className="text-[10px] text-muted-foreground">
                {stepProfit.percent.toFixed(2)}%
              </span>
            </div>
          </div>
        )}
        {stepFee && (
          <div className="flex rounded-md overflow-hidden border border-primary/50">
            <div className="bg-primary/20 text-primary px-2 py-1 text-xs font-medium">
              Fee
            </div>
            <div className="bg-transparent px-2 py-1 text-xs font-medium">
              -${stepFee.usd.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex w-full items-center">
        <div className="flex flex-1 flex-col border-right items-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {+fromAmount.toPrecision(6)}
          </h3>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {fromToken}
          </h4>
        </div>
        <MoveRight />
        <div className="flex flex-1 flex-col items-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {+toAmount.toPrecision(6)}
          </h3>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {toToken}
          </h4>
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button asChild className="w-full">
        <Link href={providerLink} target="_blank">
          Swap on {providerName}
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export default Step;
