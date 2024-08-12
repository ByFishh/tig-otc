import { GlobeIcon } from "@radix-ui/react-icons";
import { Button, Flex, IconButton, Popover, Text } from "@radix-ui/themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { displayAddress } from "@/utils/displayAddress";
import { useWalletButton } from "./WalletButton.logic";
import { formatTIG } from "@/utils/formatTIG";
import { formatUSDC } from "@/utils/formatUSDC";

const WalletButton = () => {
  const logic = useWalletButton();
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");
        if (account?.address) logic.addressRef.current = account.address;
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button type="button" onClick={openConnectModal}>
                    <GlobeIcon /> Connect
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <Flex direction="column">
                  <Button onClick={openAccountModal}>
                    <Popover.Root open={logic.toggle}>
                      <Popover.Trigger onMouseEnter={logic.toggleView} onMouseLeave={logic.toggleView}>
                        <Flex align="center">
                          <Text>{displayAddress(account.address)}</Text>
                        </Flex>
                      </Popover.Trigger>
                      <Popover.Content>
                        <Text style={{ fontSize: ".85rem" }} size="1">
                          <Flex direction="column" minWidth={"125px"} gap="1">
                            <Flex justify="between">
                              <Text>USDC:</Text>
                              <Text>
                                {formatUSDC(logic.USDCBalance.balance)}
                                <span style={{ fontSize: ".5rem" }}>$</span>
                              </Text>
                            </Flex>

                            <Flex justify="between">
                              <Text>TIG:</Text>
                              <Text>
                                {formatTIG(logic.TIGBalance.balance)}
                                <span style={{ fontSize: ".5rem" }}>TIG</span>
                              </Text>
                            </Flex>
                          </Flex>
                        </Text>
                      </Popover.Content>
                    </Popover.Root>
                  </Button>
                </Flex>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletButton;
