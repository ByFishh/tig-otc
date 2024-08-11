import { Flex, Heading } from "@radix-ui/themes";
import React from "react";
import TradesTable from "../TradesTable/TradesTable";

const Trades = () => {
  return (
    <Flex direction="column" width="100%">
      <Heading as="h2" weight="medium" mb="4">
        Last Trades
      </Heading>
      <Flex width="100%">
        <TradesTable />
      </Flex>
    </Flex>
  );
};

export default Trades;
