import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { commentsReducer } from './slices';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      // some custom middleware
    ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
