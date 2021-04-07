import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/configureStore';

interface LayoutState {
    width: number,
}
export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    width: 0
  },
  reducers: {
    widthChange: (state, action: PayloadAction<number>) => {
      state.width = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { widthChange } = layoutSlice.actions

export default layoutSlice.reducer