import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

interface Habit {
  id: number,
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
    { id:1, title: '1일 1커밋', checklist:[
      '20210504','20210506','20210507','20210508',
    ] },
    { id:2, title: '개인 프로젝트 개발', checklist:[
      '20210504','20210505','20210507','20210509',
    ] },
    { id:3, title: 'ps', checklist:[] },
    { id:4, title: '영어 공부', checklist:[] },
    { id:5, title: '기업 조사', checklist:[] }
  ]
}

export const habitlistSlice = createSlice({
  name: 'habitlist',
  initialState,
  reducers: {
    updateCurrentRenderDate: (state, action: PayloadAction<string>) => {
      state.currentPointDate = action.payload
    },
    updateChecklist: (state,action: PayloadAction<{ id:number,code:string }>) => {
      console.log(action.payload);
      const { code, id } = action.payload;
      let habit = state.habitlist.find(o => o.id === id);
      if(habit?.checklist.includes(code)) {
        habit.checklist.splice(habit.checklist.indexOf(code),1)
      } else {
        habit?.checklist.push(code);
      }
    }
  },
  extraReducers: builder => {
    // builder.addCase(loadInitialData.fulfilled, (state, action) => {
    //   state.cardlist = [ ...action.payload ]
    // })
  },
  
})

export const { updateCurrentRenderDate, updateChecklist } = habitlistSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default habitlistSlice.reducer