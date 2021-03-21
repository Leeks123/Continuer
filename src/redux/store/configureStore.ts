import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../reducers/counterSlice';


const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: getDefaultMiddleware(),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch