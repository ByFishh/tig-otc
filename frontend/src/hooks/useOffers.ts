import { abi } from "@/abi/abi";
import { OTC_ADDRESS } from "@/const/const";
import { IOffer } from "@/types/IOffer/IOffer";
import { useEffect, useState } from "react";
import { ReadContractErrorType } from "viem";
import { base } from "viem/chains";
import { useConfig, useReadContract } from "wagmi";
import { watchContractEvent } from "wagmi/actions";

export const useOffers = (): {
  isLoading: boolean;
  buyOffers: IOffer[];
  sellOffers: IOffer[];
  error: ReadContractErrorType | null;
} => {
  const config = useConfig();
  const [buyOffers, setBuyOffers] = useState<IOffer[]>([]);
  const [sellOffers, setSellOffers] = useState<IOffer[]>([]);

  const unwatch = watchContractEvent(config, {
    address: OTC_ADDRESS,
    abi,
    eventName: "OfferCreated",
    onLogs(logs) {
      // add offers here
    },
  });

  const { data, isLoading, error } = useReadContract({
    address: OTC_ADDRESS,
    chainId: base.id,
    abi,
    functionName: "getOrders",
    args: [0],
  });

  useEffect(() => {
    return unwatch();
  }, []);

  useEffect(() => {
    if (!data) return;
    const buyOffers = data.filter((o) => o.offerType === 0);
    const sellOffers = data.filter((o) => o.offerType === 1);
    setBuyOffers(buyOffers);
    setSellOffers(sellOffers);
  }, [data]);

  return {
    error,
    isLoading,
    buyOffers,
    sellOffers,
  };
};
