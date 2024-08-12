import { IOffersTableButton } from "@/types/IOffersTableButton/IOffersTableButton";
import { toCapitalize } from "@/utils/toCapitalize";
import { Button } from "@radix-ui/themes";
import React from "react";
import { useOffersTableButton } from "./OffersTableButton.logic";

const OffersTableButton = (props: IOffersTableButton) => {
  const logic = useOffersTableButton(props);
  return (
    <Button size="1" style={{ width: "100%" }} onClick={logic.openOffer} disabled={!logic.address}>
      {toCapitalize(props.type)}
    </Button>
  );
};

export default OffersTableButton;
