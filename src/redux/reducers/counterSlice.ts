import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/configureStore';

interface CounterState {
    value: number,
}
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
        state.value += action.payload
      }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer