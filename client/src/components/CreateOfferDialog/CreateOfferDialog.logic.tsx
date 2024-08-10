import { useDialogs } from "@/store/dialogsReducer/dialogsReducer";
import { IAction } from "@/store/dialogsReducer/dialogsReducer.types";
import { IOffer } from "@/types/IOffer/IOffer";
import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export const useCreateOfferDialog = () => {
  const { data, dispatch } = useDialogs();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isValid, isDirty },
  } = useForm<IOffer>({
    mode: "onChange",
  });

  const index = 1.54; // Dollar index
  const balance = 231; // User balance

  const onSubmit: SubmitHandler<IOffer> = (data: IOffer) => {};

  const closeModal = useCallback(() => {
    dispatch({ action: IAction.CLOSE_MODAL });
  }, []);

  const fieldUpdate = (key: string, e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    const value = Number(e.target.value);
    onChange(value);
    if (typeof value !== "number") return;
    if (key === "quantity") setValue("total", value === 0 ? 0 : value * index);
    if (key === "total") setValue("quantity", value === 0 ? 0 : value / index);
  };

  const hasEnoughtTIG = (field: number): boolean | string => {
    if (field > balance) return "The number of TIGs entered is greater than your current balance";
    return true;
  };

  return { closeModal, data, handleSubmit, onSubmit, control, isValid, isDirty, fieldUpdate, balance, hasEnoughtTIG };
};
