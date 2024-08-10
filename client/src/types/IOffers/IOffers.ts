import { IOffer } from '../IOffer/IOffer';
import { IOfferType } from '../IOfferType/IOfferType';

export type IOffers = {
  type: IOfferType;
  title: string;
  description: string;
  data: IOffer[];
};
