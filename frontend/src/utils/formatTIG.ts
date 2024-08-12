import { formatUnits } from "viem";

export const formatTIG = (value: bigint | undefined): number => {
  if (value === undefined) return 0;
  return Number(formatUnits(value, 18));
};
