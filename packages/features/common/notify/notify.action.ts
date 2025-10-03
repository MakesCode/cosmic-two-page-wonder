import { createAction } from '@reduxjs/toolkit';
import { TypeNotifyMessage } from '@features/common/notify/model/typeMessage';

export const notificationAdded = createAction<{
  message?: string;
  typeMessage?: TypeNotifyMessage;
}>('NOTIFICATION_ADDED');
export const notificationClosed = createAction('NOTIFICATION_CLOSED');
