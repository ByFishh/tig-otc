import { IModals } from '@/types/IModals/IModals';

export type S = {
  isOpen: IModals | null;
  data: any | null;
  dispatch: (args: { action: IAction; payload?: unknown }) => void;
};

export enum IAction {
  OPEN_MODAL = 'open_modal',
  CLOSE_MODAL = 'close_modal',
}
