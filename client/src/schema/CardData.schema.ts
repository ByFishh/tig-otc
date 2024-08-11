import { IUnit } from "@/types/IUnit/IUnit";
import { z } from "zod";

export const cardDataSchema = z.object({
  title: z.string().min(1, { message: "This field is required" }),
  value: z.number().nullable().default(0),
  unit: z.nativeEnum(IUnit),
  percentage: z.number().nullable().default(null).optional(),
});
