import { Address, erc20Abi } from "viem";
import { base } from "viem/chains";
import { useReadContract } from "wagmi";

export const useMarketCap = (token: Address) => {
  const { data } = useReadContract({
    address: token,
    chainId: base.id,
    abi: erc20Abi,
    functionName: "totalSupply",
  });

  return { data };
};
