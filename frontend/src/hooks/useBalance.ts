import { erc20Abi, Address } from "viem";
import { useAccount, useReadContract, useBalance as useNativeBalance } from "wagmi";
import { QueryKey } from "@tanstack/react-query";
import { base } from "viem/chains";

export interface UseBalanceParams {
  address?: Address;
  token?: Address;
}

export interface UseBalanceResult {
  balance: bigint | undefined;
  isLoading: boolean;
  queryKey: QueryKey;
}

export const useBalance: (UseBalanceParams: UseBalanceParams) => UseBalanceResult = ({ address, token }) => {
  const { address: connectedAddress } = useAccount();
  const userAddress = address || connectedAddress;
  const {
    data: balance,
    isLoading,
    queryKey,
  } = useReadContract({
    address: userAddress ? token : undefined,
    chainId: base.id,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [userAddress!],
  });
  const { data: nativeBalance } = useNativeBalance({
    address: connectedAddress,
  });

  return {
    balance: token === "0x0000000000000000000000000000000000000000" ? nativeBalance?.value : balance,
    isLoading,
    queryKey,
  };
};
