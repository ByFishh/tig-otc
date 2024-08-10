import { useDialogs } from "@/store/dialogsReducer/dialogsReducer";
import { IModals } from "@/types/IModals/IModals";
import { useMemo } from "react";
import CreateOfferDialog from "../CreateOfferDialog/CreateOfferDialog";
import OfferDialog from "../OfferDialog/OfferDialog";

export const useDialogsContainer = () => {
  const { isOpen } = useDialogs();

  const displayDialogs = useMemo(
    () => [
      {
        key: IModals.CREATE_OFFER,
        show: isOpen === IModals.CREATE_OFFER,
        content: <CreateOfferDialog />,
      },
      {
        key: IModals.OFFER,
        show: isOpen === IModals.OFFER,
        content: <OfferDialog />,
      },
    ],
    [isOpen]
  );

  return { displayDialogs };
};
