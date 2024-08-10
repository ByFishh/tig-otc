import { useDialogs } from "@/store/dialogsReducer/dialogsReducer";
import { IAction } from "@/store/dialogsReducer/dialogsReducer.types";
import { IModals } from "@/types/IModals/IModals";
import { IOffersTableButton } from "@/types/IOffersTableButton/IOffersTableButton";
import { useCallback } from "react";

export const useOffersTableButton = (props: IOffersTableButton) => {
  const { dispatch } = useDialogs();

  const openOffer = useCallback(() => {
    dispatch({ action: IAction.OPEN_MODAL, payload: { isOpen: IModals.OFFER, data: { type: props.type } } });
  }, [props.type]);

  return { openOffer };
};
