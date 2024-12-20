import React from "react";
import { displayAddress } from "@/utils/displayAddress";
import { Flex, IconButton, Popover, Text } from "@radix-ui/themes";
import { CopyIcon } from "@radix-ui/react-icons";
import { useAddress } from "./Address.logic";
import { IAddress } from "@/types/IAddress/IAddress";
import BaseScanIcon from "@/icons/BaseScanIcon";

const Address = (props: IAddress) => {
  const logic = useAddress(props);
  return (
    <Popover.Root open={logic.toggle}>
      <Popover.Trigger onMouseEnter={logic.toggleView} onMouseLeave={logic.toggleView}>
        <Flex align="center">
          <Text>{displayAddress(props.address)}</Text>
          {props.copy && (
            <IconButton size="1" ml="1" color="gray" variant="soft" onClick={logic.onCopy} style={{ background: "none" }}>
              <CopyIcon width="14" height="14" />
            </IconButton>
          )}
          {props.baseScan && (
            <a
              href={`https://basescan.org/address/${props.address}`}
              target="_blank"
              style={{
                background: "none",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginLeft: ".25rem",
              }}
            >
              <BaseScanIcon />
            </a>
          )}
        </Flex>
      </Popover.Trigger>
      <Popover.Content>
        <Text style={{ fontSize: ".85rem" }} size="1">
          {props.address}
        </Text>
      </Popover.Content>
    </Popover.Root>
  );
};

export default Address;
