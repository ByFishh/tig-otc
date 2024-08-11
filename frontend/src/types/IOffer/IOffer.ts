import { Address } from "viem";

export type IOffer = {
  creator: Address;
  inAmount: bigint;
  inToken: Address;
  offerStatus: number;
  offerType: number;
  outAmount: bigint;
  outToken: Address;
};
