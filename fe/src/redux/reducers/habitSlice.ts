import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

interface Habit {
  title: string,
  checklist : string[],
}
interface HabitListState {
  currentPointDate: string,
  habitlist: Habit[],
}

export const fn = createAsyncThunk(
  'habitlist/loadInitialData',
  async (_,{getState, dispatch}) => {
    
  },
)

const initialState: HabitListState = {
  currentPointDate: (new Date()).toString(),
  habitlist: [
    { title: '1일 1커밋', checklist:[] },
    { title: '개인 프로젝트 개발', checklist:[] },
    { title: 'ps', checklist:[] },
    { title: '영어 공부', checklist:[] },
    { title: '기업 조사', checklist:[] }
  ]
}

export const habitlistSlice = createSlice({
  name: 'habitlist',
  initialState,
  reducers: {
    updateCurrentRenderDate: (state, action: PayloadAction<string>) => {
      state.currentPointDate = action.payload
    }
  },
  extraReducers: builder => {
    // builder.addCase(loadInitialData.fulfilled, (state, action) => {
    //   state.cardlist = [ ...action.payload ]
    // })
  },
  
})

export const { updateCurrentRenderDate } = habitlistSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default habitlistSlice.reducer