import React from "react";
import { Table, Text } from "@radix-ui/themes";
import { headers } from "./OffersTable.data";
import { v4 as uuidv4 } from "uuid";
import TableCell from "../TableCell/TableCell";
import { IOffersTable } from "@/types/IOffersTable/IOffersTable";
import OffersTableButton from "../OffersTableButton/OffersTableButton";

const OffersTable = (props: IOffersTable) => {
  return (
    <Table.Root size="3" style={{ width: "100%", height: "320px" }} variant="surface">
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
        {props.data.map((d) => (
          <Table.Row key={uuidv4()}>
            <TableCell>{d.quantity}</TableCell>
            <TableCell>{d.price}</TableCell>
            <TableCell>{d.total}</TableCell>
            <TableCell>
              <OffersTableButton type={props.type} />
            </TableCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default OffersTable;
