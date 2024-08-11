import { useDialogs } from "@/store/dialogsReducer/dialogsReducer";
import { IAction } from "@/store/dialogsReducer/dialogsReducer.types";
import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { abi } from "../../abi/abi";
import { useWriteContract } from "wagmi";
import { IOfferType } from "@/types/IOfferType/IOfferType";
import { erc20Abi, parseEther } from "viem";
import { OTC_ADDRESS, TIG_ADDRESS, USDC_ADDRESS } from "@/const/const";
import { IOfferDTO } from "@/types/IOfferDTO/IOfferDTO";

export const useCreateOfferDialog = () => {
  const { data, dispatch } = useDialogs();
  const { writeContract } = useWriteContract();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isValid, isDirty },
  } = useForm<IOfferDTO>({
    mode: "onChange",
  });

  const index = 1.54; // Dollar index
  const balance = 231; // User balance

  const onSubmit: SubmitHandler<IOfferDTO> = (form: IOfferDTO) => {
    if (!data.type) return; // throw error

    if (data.type === IOfferType.BUY) {
      writeContract({
        abi: erc20Abi,
        address: USDC_ADDRESS,

        functionName: "approve",
        args: [OTC_ADDRESS, BigInt(form.total * 10 ** 6)],
      });

      writeContract({
        abi,
        address: OTC_ADDRESS,
        functionName: "createOffer",
        args: [0, parseEther(String(form.total)), parseEther(String(form.quantity))],
      });
    }

    if (data.type === IOfferType.SELL) {
      writeContract({
        abi: erc20Abi,
        address: TIG_ADDRESS,

        functionName: "approve",
        args: [OTC_ADDRESS, parseEther(String(form.quantity))],
      });

      writeContract({
        abi,
        address: OTC_ADDRESS,
        functionName: "createOffer",
        args: [1, parseEther(String(form.quantity)), parseEther(String(form.total))],
      });
    }
  };

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
