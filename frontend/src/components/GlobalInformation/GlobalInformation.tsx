"use client";
import { Grid } from "@radix-ui/themes";
import React from "react";
import { useGlobalInformation } from "./GlobalInformation.logic";
import Card from "../Card/Card";
import { v4 as uuidv4 } from "uuid";

const GlobalInformation = () => {
  const logic = useGlobalInformation();

  return (
    <Grid justify="between" align="center" gap="3" columns={{ sm: "2" }}>
      {logic.items.map((i) => (
        <Card key={uuidv4()} {...i} />
      ))}
    </Grid>
  );
};

export default GlobalInformation;
