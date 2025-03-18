export const calculateAPR = (feesUSD: string, totalValueLockedUSD: string) => {
  if (!feesUSD || !totalValueLockedUSD || totalValueLockedUSD === "0") return 0;
  const dailyAPR =
    (parseFloat(feesUSD) / parseFloat(totalValueLockedUSD)) * 100;
  const annualAPR = dailyAPR * 365;
  return annualAPR.toFixed(2); // Return APR as a percentage
};
