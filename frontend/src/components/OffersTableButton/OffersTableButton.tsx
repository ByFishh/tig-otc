import { IOffersTableButton } from "@/types/IOffersTableButton/IOffersTableButton";
import { toCapitalize } from "@/utils/toCapitalize";
import { Button } from "@radix-ui/themes";
import React from "react";
import { useOffersTableButton } from "./OffersTableButton.logic";

const OffersTableButton = (props: IOffersTableButton) => {
  const logic = useOffersTableButton(props);
  return (
    <Button size="2" style={{ width: "100%" }} onClick={logic.openOffer}>
      {toCapitalize(props.type)}
    </Button>
  );
};

export default OffersTableButton;
