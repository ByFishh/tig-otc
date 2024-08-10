import { useDialogs } from "@/store/dialogsReducer/dialogsReducer";
import { IAction } from "@/store/dialogsReducer/dialogsReducer.types";
import { useCallback } from "react";

export const useOfferDialog = () => {
  const { data, dispatch } = useDialogs();

  const closeModal = useCallback(() => {
    dispatch({ action: IAction.CLOSE_MODAL });
  }, []);

  const handleSubmit = () => {};

  const fakeData = {
    seller: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
    buyer: "0xF0AD7F7124f0739fF989eAE017B1d0c2A690424b",
    Spend: 230,
    Receive: 170.3,
    FEE: 23,
  };

  return { data, closeModal, fakeData, handleSubmit };
};
