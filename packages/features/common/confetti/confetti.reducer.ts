import { createReducer } from '@reduxjs/toolkit';
import { confettiClosed } from './confetti.action';

export type confettiInitialStateModel = {
  isOpen: boolean;
};

export const confettiInitialState: confettiInitialStateModel = {
  isOpen: false,
};

export const confettiReducer = createReducer(confettiInitialState, (builder) => {
  builder
    .addCase(confettiClosed, (state) => {
      state.isOpen = false;
    });
});
