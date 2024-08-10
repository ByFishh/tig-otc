import { IOffer } from '../IOffer/IOffer';
import { IOfferType } from '../IOfferType/IOfferType';

export type IOffersTable = {
  type: IOfferType;
  data: IOffer[];
};
