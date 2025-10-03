import { createReducer } from '@reduxjs/toolkit';
import { notificationAdded, notificationClosed } from '@admin/features/common/notify/notify.action';
import { messageNotify, TypeNotifyMessage } from '@admin/features/common/notify/model/typeMessage';

export type notifyInitialStateModel = {
  isOpen: boolean;
  message: string;
};

export const notifyInitialState: notifyInitialStateModel = {
  isOpen: false,
  message: '',
};

export const notifyReducer = createReducer(notifyInitialState, (builder) => {
  builder
    .addCase(notificationAdded, (state, action) => {
      const { typeMessage, message } = action.payload;
      state.isOpen = true;
      state.message = (typeMessage ? messageNotify[typeMessage] : (message ?? '')) ?? messageNotify[TypeNotifyMessage.errorApi];
    })
    .addCase(notificationClosed, (state, action) => {
      state.isOpen = false;
      state.message = '';
    });
});
