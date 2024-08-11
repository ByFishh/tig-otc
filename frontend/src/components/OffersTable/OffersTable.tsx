import React from "react";
import { Table, Text } from "@radix-ui/themes";
import { headers } from "./OffersTable.data";
import { v4 as uuidv4 } from "uuid";
import TableCell from "../TableCell/TableCell";
import { IOffersTable } from "@/types/IOffersTable/IOffersTable";
import OffersTableButton from "../OffersTableButton/OffersTableButton";
import { useOffersTable } from "./OffersTable.logic";
import { IOfferType } from "@/types/IOfferType/IOfferType";
import { formatUnits } from "viem";

const OffersTable = (props: IOffersTable) => {
  const logic = useOffersTable(props);
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
        {!!logic.offers?.length &&
          logic.offers.map((o) => (
            <Table.Row key={uuidv4()}>
              <TableCell>
                {props.type === IOfferType.BUY
                  ? formatUnits(o.inAmount ?? BigInt(0), 18)
                  : formatUnits(o.outAmount ?? BigInt(0), 18)}
              </TableCell>
              <TableCell>{logic.getPrice({ tig: o.inAmount, usdc: o.outAmount })}</TableCell>
              <TableCell>
                {props.type === IOfferType.BUY
                  ? formatUnits(o.outAmount ?? BigInt(0), 6)
                  : formatUnits(o.inAmount ?? BigInt(0), 6)}
              </TableCell>

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
