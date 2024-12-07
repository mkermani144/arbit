import { MoveRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface StepProps {
  fromToken: string;
  toToken: string;
  fromAmount: number;
  toAmount: number;
  providerName: string;
  providerLink: string;
}

const Step = ({
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  providerName,
  providerLink,
}: StepProps) => (
  <Card className="w-[350px]">
    <CardHeader />
    <CardContent>
      <div className="flex w-full items-center">
        <div className="flex flex-1 flex-col border-right items-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {fromAmount}
          </h3>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {fromToken}
          </h4>
        </div>
        <MoveRight />
        <div className="flex flex-1 flex-col items-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {toAmount}
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
