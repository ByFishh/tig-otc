import { abi } from "@/abi/abi";
import { OTC_ADDRESS } from "@/const/const";
import { IOffer } from "@/types/IOffer/IOffer";
import { useEffect, useState } from "react";
import { base } from "viem/chains";
import { useConfig, useReadContract } from "wagmi";
import { watchContractEvent } from "wagmi/actions";

export const useOffers = (): { buyOffers: IOffer[]; sellOffers: IOffer[] } => {
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

  const { data } = useReadContract({
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
    buyOffers,
    sellOffers,
  };
};
