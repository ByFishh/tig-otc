"use client";
import { Flex, Table, Text } from "@radix-ui/themes";
import React from "react";
import { headers } from "./TradesTable.data";
import TableCell from "../TableCell/TableCell";
import { v4 as uuidv4 } from "uuid";
import { useTradesTable } from "./TradesTable.logic";
import { ITradeKey } from "@/types/ITradeKey/ITradeKey";
import { formatTIG } from "../../utils/formatTIG";
import { formatUSDC } from "@/utils/formatUSDC";

const TradesTable = () => {
  const logic = useTradesTable();

  if (!logic.trades.length)
    return (
      <Flex width="100%" align="center" justify="center" py="6">
        <Text>No exchanges recorded in the last 24 hours.</Text>
      </Flex>
    );

  return (
    <Table.Root
      size="3"
      style={{
        width: "100%",
        maxHeight: "500px",
      }}
      variant="surface"
    >
      <Table.Header>
        <Table.Row>
          {headers.map((h) => (
            <TableCell key={uuidv4()}>
              <Text size="2">
                {h.txt} {h.unit && <span style={{ fontSize: ".725rem" }}>({h.unit})</span>}
              </Text>
            </TableCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {logic.trades.map((d) => (
          <Table.Row key={uuidv4()}>
            <TableCell>{logic.convertTradesData(ITradeKey.TIME, d.time)}</TableCell>
            <TableCell>{logic.convertTradesData(ITradeKey.FROM, d.from)}</TableCell>
            <TableCell>{logic.convertTradesData(ITradeKey.TO, d.to)}</TableCell>
            <TableCell>{logic.convertTradesData(ITradeKey.QUANTITY, formatTIG(d.inAmount))}</TableCell>
            <TableCell>{logic.convertTradesData(ITradeKey.PRICE, formatUSDC(d.outAmount) / formatTIG(d.inAmount))}</TableCell>
            <TableCell>{logic.convertTradesData(ITradeKey.TOTAL, formatUSDC(d.outAmount))}</TableCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TradesTable;
