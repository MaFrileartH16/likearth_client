import {configureStore} from '@reduxjs/toolkit';
import testReducer from '../features/testSlice';

export const store = configureStore({
  reducer: {
    testSlice: testReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
