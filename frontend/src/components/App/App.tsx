"use client";
import React from "react";
import { Container } from "@radix-ui/themes";
import DialogsContainer from "../DialogsContainer/DialogsContainer";
import Navbar from "../Navbar/Navbar";
import { darkTheme, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base } from "viem/chains";
import { WagmiProvider } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";

const App = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains: [base],
    ssr: true,
  });

  const queryClient = new QueryClient();

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>
            <Navbar />
            <DialogsContainer />
            <Container
              style={{
                minHeight: "calc(100vh - 12rem)",
              }}
            >
              {children}
            </Container>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};

export default App;
