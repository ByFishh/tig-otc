"use client";
import { Table, Text } from "@radix-ui/themes";
import React from "react";
import { headers } from "./TradesTable.data";
import TableCell from "../TableCell/TableCell";
import { v4 as uuidv4 } from "uuid";
import { useTradesTable } from "./TradesTable.logic";

const TradesTable = () => {
  const logic = useTradesTable();

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
        {/* {props.data.map((d) => (
          <Table.Row key={uuidv4()}>
            <TableCell>{logic.convertTradesData(ITradeKey.TIME, d.time)}</TableCell>
            <TableCell>{logic.convertTradesData(ITradeKey.FROM, d.from)}</TableCell>
            <TableCell>{logic.convertTradesData(ITradeKey.TO, d.to)}</TableCell>
            <TableCell>{logic.convertTradesData(ITradeKey.QUANTITY, d.quantity)}</TableCell>
            <TableCell>{logic.convertTradesData(ITradeKey.PRICE, d.price)}</TableCell>
            <TableCell>{logic.convertTradesData(ITradeKey.TOTAL, d.total)}</TableCell>
          </Table.Row>
        ))} */}
      </Table.Body>
    </Table.Root>
  );
};

export default TradesTable;
