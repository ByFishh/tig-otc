"use client";
import { Badge, Box, Flex, Text } from "@radix-ui/themes";
import React from "react";
import Link from "next/link";
import { useNavbar } from "./Navbar.logic";
import Logo from "@/icons/Logo";
import WalletButton from "../WalletButton/WalletButton";

const Navbar = () => {
  const logic = useNavbar();

  return (
    <>
      <Box p="0">
        <nav>
          <Flex justify="between" p="2">
            <Flex align="center" gap="2">
              <Logo />
              <Text weight="bold">
                TIG <span style={{ color: "#ccb256" }}>OTC</span>
              </Text>
            </Flex>
            <Flex justify="between" align="center">
              <Link href="/">
                <Badge color="gray" variant={"soft"} size="3" radius="full" highContrast>
                  Tig Explorer
                </Badge>
              </Link>
            </Flex>
            <Flex justify="between" align="center">
              <WalletButton />
            </Flex>
          </Flex>
        </nav>
      </Box>
    </>
  );
};

export default Navbar;
