export const calculateAPR = (feesUSD: string, totalValueLockedUSD: string) => {
  if (!feesUSD || !totalValueLockedUSD || totalValueLockedUSD === "0") return 0;
  const dailyAPR =
    (parseFloat(feesUSD) / parseFloat(totalValueLockedUSD)) * 100;
  const annualAPR = dailyAPR * 365;
  return annualAPR.toFixed(2); // Return APR as a percentage
};

export const calculateAPRV2 = (
  dailyFeesUSD: number,
  tvlUSD: number,
  decimals = 2,
) => {
  const tvl = ((dailyFeesUSD * 365) / tvlUSD) * 100;
  return tvlUSD > 0 ? tvl.toFixed(decimals) : 0;
};
