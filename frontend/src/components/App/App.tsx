"use client";
import React from "react";
import { Container } from "@radix-ui/themes";
import DialogsContainer from "../DialogsContainer/DialogsContainer";

const App = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <DialogsContainer />
      <Container>{children}</Container>
    </>
  );
};

export default App;
