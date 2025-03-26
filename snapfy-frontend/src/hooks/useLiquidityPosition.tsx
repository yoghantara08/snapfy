import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

import { getUserLiquidityPosition } from "@/lib/services/snapfyUniswapV2Service";
import { LiquidityPositionType } from "@/types";

const useLiquidityPosition = (userAddress: Address, pairAddress: Address) => {
  return useQuery({
    queryKey: ["userLiquidityPosition", userAddress, pairAddress],
    queryFn: async (): Promise<LiquidityPositionType> => {
      const result = await getUserLiquidityPosition(userAddress, pairAddress);
      return result;
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    retry: 2,
  });
};

export default useLiquidityPosition;
