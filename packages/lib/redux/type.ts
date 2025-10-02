import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

export type OptionalDispatch = Dispatch<UnknownAction> | null | undefined;
