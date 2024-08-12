import { useOffers } from "@/hooks/useOffers";
import { IOffersTable } from "@/types/IOffersTable/IOffersTable";
import { IOfferType } from "@/types/IOfferType/IOfferType";
import { useMemo } from "react";
import { formatUnits } from "viem";

export const useOffersTable = (props: IOffersTable) => {
  const { buyOffers, sellOffers, isLoading, error } = useOffers();

  const offers = useMemo(() => {
    if (props.type === IOfferType.BUY) return buyOffers;
    if (props.type === IOfferType.SELL) return sellOffers;
  }, [props.type, buyOffers, sellOffers]);

  const getPrice = (data: { tig: bigint; usdc: bigint }): string => {
    const price = Number(formatUnits(data.usdc, 6)) / Number(formatUnits(data.tig, 18));
    return price.toFixed(2);
  };

  return { offers, getPrice, isLoading, error };
};
