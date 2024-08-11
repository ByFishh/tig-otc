import { cardDataSchema } from "@/schema/CardData.schema";
import { z } from "zod";

export type ICardData = z.infer<typeof cardDataSchema>;
