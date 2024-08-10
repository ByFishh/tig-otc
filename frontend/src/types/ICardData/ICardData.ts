import { z } from 'zod';
import { cardDataSchema } from '@/schemas/CardData.schema';

export type ICardData = z.infer<typeof cardDataSchema>;
