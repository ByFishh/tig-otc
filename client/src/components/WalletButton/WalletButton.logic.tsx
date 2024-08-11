import { TIG_ADDRESS, USDC_ADDRESS } from "@/const/const";
import { useRef, useState } from "react";
import { useBalance } from "wagmi";

export const useWalletButton = () => {
  const TIGBalance = useBalance({ token: TIG_ADDRESS });
  const USDCBalance = useBalance({ token: USDC_ADDRESS });

  // State
  const [toggle, setToggle] = useState<boolean>(false);

  // Ref
  const addressRef = useRef<string>("");

  const toggleView = () => setToggle(!toggle);

  return { toggle, toggleView, TIGBalance, USDCBalance, addressRef };
};
