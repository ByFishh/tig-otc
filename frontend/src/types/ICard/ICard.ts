import { ICardData } from '../ICardData/ICardData';

export type ICard = {
  title: string;
  close?: JSX.Element;
  description: string;
  data: ICardData[];
  content?: JSX.Element;
  forceRender?: boolean;
};
