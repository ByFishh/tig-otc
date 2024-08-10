import { create } from 'zustand';
import { IAction, S } from './dialogsReducer.types';

const reducer = (
  state: S,
  args: { action: IAction; payload?: any },
): Partial<S> => {
  const { action, payload } = args;
  switch (action) {
    case IAction.OPEN_MODAL:
      return { isOpen: payload.isOpen, data: payload.data };
    case IAction.CLOSE_MODAL:
      return { isOpen: null, data: null };
    default:
      return state;
  }
};

export const useDialogs = create<S>()((set) => ({
  isOpen: null,
  data: null,
  dispatch: (args: { action: IAction; payload?: any }) =>
    set((state: S) => ({
      ...state,
      ...reducer(state, args),
    })),
}));
