import GithubRepo from "@/components/github-repo";
import HeroPrice from "@/components/hero-price";
import { ModeToggle } from "@/components/mode-toggle";
import Step from "@/components/step";

/**
 * TODO: Remove placeholder data in favor of real data when core module is
 * implemented
 * https://github.com/ConnecMent/arbit/issues/17
 */
export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center flex-col px-4">
      <div className="fixed top-4 left-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Arbit
        </h3>
      </div>
      <div className="fixed top-4 right-4">
        <div className="flex gap-2">
          <ModeToggle />
          <GithubRepo />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <HeroPrice usd={19.7} percent={5.3} />
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        Top profit right now. All fees considered. 5% slippage.
      </p>
      <div className="flex mt-8 gap-4">
        <Step
          fromToken="ERG"
          fromAmount={100}
          toToken="rsADA"
          toAmount={200}
          providerName="ErgoDex"
          providerLink="https://www.ergodex.io/ergo/swap?base=0000000000000000000000000000000000000000000000000000000000000000&quote=e023c5f382b6e96fbd878f6811aac73345489032157ad5affb84aefd4956c297&initialPoolId=ae97c5eccd59a065cd973a8d6afb8bb79f9cc70368a7dcdf73aaeab1cedf6f6b"
        />
        <Step
          fromToken="ADA"
          fromAmount={200}
          toToken="rsERG"
          toAmount={109.8}
          providerName="Splash"
          providerLink="https://app.splash.trade/04b95368393c821f180deee8229fbd941baaf9bd748ebcdbf7adbb147273455247-ADA"
        />
      </div>
    </div>
  );
}
