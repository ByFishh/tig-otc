import { IOffersTableButton } from "@/types/IOffersTableButton/IOffersTableButton";
import { toCapitalize } from "@/utils/toCapitalize";
import { Button } from "@radix-ui/themes";
import React from "react";

const OffersTableButton = (props: IOffersTableButton) => {
  return (
    <Button size="2" style={{ width: "100%" }}>
      {toCapitalize(props.type)}
    </Button>
  );
};

export default OffersTableButton;
