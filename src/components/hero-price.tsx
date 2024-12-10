interface HeroPriceProps {
  usd: number;
  percent: number;
}

const HeroPrice = ({ usd, percent }: HeroPriceProps) => (
  <>
    <h1 className="scroll-m-20 text-7xl font-extrabold tracking-tight lg:text-9xl">
      ${+usd.toPrecision(6)}
    </h1>
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {+percent.toPrecision(4)}%
    </h2>
  </>
);

export default HeroPrice;
