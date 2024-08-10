"use client";
import React from "react";
import { Container } from "@radix-ui/themes";

const App = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Container>{children}</Container>;
};

export default App;
