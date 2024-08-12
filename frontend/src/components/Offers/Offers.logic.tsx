import { useDialogs } from "@/store/dialogsReducer/dialogsReducer";
import { IAction } from "@/store/dialogsReducer/dialogsReducer.types";
import { IModals } from "@/types/IModals/IModals";
import { IOffers } from "@/types/IOffers/IOffers";
import { useCallback } from "react";
import { useAccount } from "wagmi";

export const useOffers = (props: IOffers) => {
  const { dispatch } = useDialogs();
  const { address } = useAccount();

  const openCreateOffer = useCallback(() => {
    dispatch({ action: IAction.OPEN_MODAL, payload: { isOpen: IModals.CREATE_OFFER, data: { type: props.type } } });
  }, [props.type]);

  return { openCreateOffer, address };
};
