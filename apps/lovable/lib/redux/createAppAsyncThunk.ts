import { createAsyncThunk, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { rootReducer } from '../../../../packages/lib/redux/rootReducer';
import { Dependencies } from './dependencies';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, UnknownAction>;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra: Dependencies;
}>();
