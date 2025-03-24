import BigNumber from "bignumber.js";

type NumericValue = number | bigint | string;

interface FormatOptions {
  decimals?: number;
  prefix?: string;
  suffix?: string;
  threshold?: number;
  lowerCase?: boolean;
}

export const formatNumber = (
  value: NumericValue,
  options: FormatOptions = {},
): string => {
  const {
    decimals = 2,
    prefix = "",
    suffix = "",
    threshold = 1000,
    lowerCase = false,
  } = options;

  try {
    const bn = new BigNumber(value.toString());

    if (bn.isNaN()) {
      return "Invalid number";
    }

    if (bn.isZero()) {
      return `${prefix}0${suffix}`;
    }

    const absoluteValue = bn.abs();

    if (absoluteValue.lt(threshold)) {
      return `${prefix}${absoluteValue.toFixed(decimals)}${suffix}`;
    }

    const suffixCases = lowerCase
      ? ["", "k", "m", "b", "t", "q"]
      : ["", "K", "M", "B", "T", "Q"];

    const magnitude = Math.min(
      Math.floor(absoluteValue.e ? absoluteValue.e / 3 : 0),
      suffixCases.length - 1,
    );

    const scaled = absoluteValue.div(new BigNumber(10).pow(magnitude * 3));
    const formatted = scaled.toFixed(decimals);

    return `${prefix}${formatted}${suffixCases[magnitude]}${suffix}`;
  } catch (error) {
    console.error("Error formatting number:", error);
    return "Error";
  }
};

export const formatCurrency = (
  value: NumericValue,
  currencySymbol = "$",
  options: Omit<FormatOptions, "prefix"> = {},
): string => {
  return formatNumber(value, {
    ...options,
    prefix: currencySymbol,
  });
};

export const transformAddress = (
  beginning: number,
  end: number,
  address: string,
) => {
  if (address.length <= beginning + end) {
    return address;
  }

  return `${address?.slice(0, beginning)}...${address?.slice(
    address?.length - end,
  )}`;
};
