import React, { useMemo } from "react";
import { Box, Button, Dialog, Flex, IconButton, Text } from "@radix-ui/themes";
import { ArrowTopRightIcon, Cross1Icon } from "@radix-ui/react-icons";
import { IOfferType } from "@/types/IOfferType/IOfferType";
import { useOfferDialog } from "./OfferDialog.logic";
import Address from "../Address/Address";
import { IUnit } from "@/types/IUnit/IUnit";
import { toCapitalize } from "../../utils/toCapitalize";

const OfferDialog = () => {
  const logic = useOfferDialog();

  const UI = useMemo(
    () => ({
      title: logic.data.type === IOfferType.BUY ? "Buy Offer" : "Sell Offer",
    }),
    [logic.data.type]
  );

  return (
    <Dialog.Root open>
      <Dialog.Content size="4">
        <Flex justify="between" align="center">
          <Dialog.Title size="5">{UI.title}</Dialog.Title>
          <Dialog.Close>
            <Flex>
              <IconButton style={{ background: "transparent" }} onClick={logic.closeModal}>
                <Cross1Icon width="15" height="15" color="white" />
              </IconButton>
            </Flex>
          </Dialog.Close>
        </Flex>
        <Dialog.Description size="2" color="gray" mb="5">
          Offer summary
        </Dialog.Description>
        {/* // Content */}

        <Flex width="100%" justify="between" style={{ background: "#1D1D1D", borderRadius: "5px" }} p="3">
          <Text>Seller</Text>
          <Address address={logic.fakeData.seller} copy baseScan />
        </Flex>
        <Flex width="100%" justify="between" p="3">
          <Text>Buyer</Text>
          <Address address={logic.fakeData.seller} copy baseScan />
        </Flex>
        <Flex width="100%" justify="between" style={{ background: "#1D1D1D", borderRadius: "5px" }} p="3">
          <Text>Spend ({IUnit.USDC})</Text>
          <Flex align="end">
            <Text>{logic.fakeData.Spend.toFixed(2)}</Text>
            <span style={{ fontSize: "0.6rem" }}>{IUnit.USDC}</span>
          </Flex>
        </Flex>
        <Flex width="100%" justify="between" p="3">
          <Text>Receive ({IUnit.TIG})</Text>
          <Flex align="end">
            <Text>{logic.fakeData.Receive.toFixed(2)}</Text>
            <span style={{ fontSize: "0.6rem" }}>{IUnit.TIG}</span>
          </Flex>
        </Flex>
        <Flex width="100%" justify="between" style={{ background: "#1D1D1D", borderRadius: "5px" }} p="3">
          <Text>FEE</Text>
          <Flex align="end">
            <Text>{logic.fakeData.FEE.toFixed(2)}</Text>
            <span style={{ fontSize: "0.6rem" }}>{IUnit.USDC}</span>
          </Flex>
        </Flex>
        <Flex justify={"end"} mt="6">
          <Box>
            <Button onClick={logic.handleSubmit}>
              <ArrowTopRightIcon /> {toCapitalize(logic.data.type)}
            </Button>
          </Box>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default OfferDialog;
