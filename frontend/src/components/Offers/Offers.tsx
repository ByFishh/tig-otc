"use client";
import React from "react";
import { Box, Text, Card as RadixCard, Flex, Button } from "@radix-ui/themes";
import { IOffers } from "@/types/IOffers/IOffers";
import { PlusIcon } from "@radix-ui/react-icons";
import OffersTable from "../OffersTable/OffersTable";
import { useOffers } from "./Offers.logic";

const Offers = (props: IOffers) => {
  const logic = useOffers(props);
  return (
    <RadixCard size="4" style={{ width: "100%" }}>
      <Flex gap="3" align="center" mb="7">
        <Box width="100%">
          <Flex justify="between" align="center">
            <Text as="p" size="6" weight="medium" mb="1">
              {props.title}
            </Text>

            <Button size="2" style={{ minHeight: "35px" }} onClick={logic.openCreateOffer}>
              <PlusIcon /> Create Offer
            </Button>
          </Flex>
          <Text as="p" size="2" color="gray">
            {props.description}
          </Text>
        </Box>
      </Flex>
      <OffersTable type={props.type} />
    </RadixCard>
  );
};

export default Offers;
