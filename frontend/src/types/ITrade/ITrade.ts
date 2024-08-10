import { IOffer } from '../IOffer/IOffer';

export type ITrade = IOffer & {
  time: string;
  from: string;
  to: string;
};
