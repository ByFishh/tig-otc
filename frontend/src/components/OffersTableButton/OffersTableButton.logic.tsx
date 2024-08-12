import { useDialogs } from "@/store/dialogsReducer/dialogsReducer";
import { IAction } from "@/store/dialogsReducer/dialogsReducer.types";
import { IModals } from "@/types/IModals/IModals";
import { IOffersTableButton } from "@/types/IOffersTableButton/IOffersTableButton";
import { useCallback } from "react";
import { useAccount } from "wagmi";

export const useOffersTableButton = (props: IOffersTableButton) => {
  const { dispatch } = useDialogs();
  const { address } = useAccount();

  const openOffer = useCallback(() => {
    dispatch({ action: IAction.OPEN_MODAL, payload: { isOpen: IModals.OFFER, data: { type: props.type } } });
  }, [props.type]);

  return { openOffer, address };
};
