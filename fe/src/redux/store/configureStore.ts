import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import counterReducer from '../reducers/counterSlice';
import layoutReducer from '../reducers/layoutSlice';
import cardListSlice from '../reducers/cardSlice';
import userSlice from '../reducers/userSlice';
import habitListSlice from '../reducers/habitSlice';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    content: cardListSlice,
    user: userSlice,
    habit: habitListSlice,
  },
  middleware: getDefaultMiddleware(),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch