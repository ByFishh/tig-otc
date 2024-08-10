import { Flex, Table } from "@radix-ui/themes";
import React from "react";

const TableCell = (props: { children: React.ReactNode }) => {
  return (
    <Table.Cell>
      <Flex align="center" style={{ height: "100%" }}>
        {props.children}
      </Flex>
    </Table.Cell>
  );
};

export default TableCell;
