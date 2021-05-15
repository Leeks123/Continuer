import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

export interface HabitType {
  id: number,
  title: string,
  desc: string,
  checklist : string[],
}
interface HabitListState {
  currentPointDate: string,
  habitlist: HabitType[],
}

const getNextId = (currentList: HabitType[]) => {
  let sorted = currentList.sort((a,b) => a.id - b.id);
  for(let i=1;i<currentList.length;i++){
    if(sorted[i].id !== sorted[i-1].id+1) {
      return sorted[i-1].id+1;
    } 
  }
  return currentList.length+1;
}

export const fn = createAsyncThunk(
  'habitlist/loadInitialData',
  async (_,{getState, dispatch}) => {
    
  },
)

const initialState: HabitListState = {
  currentPointDate: (new Date()).toString(),
  habitlist: [
    { id:1, title: '1일 1커밋', desc:'', checklist:[
      '20210504','20210506','20210507','20210508',
    ] },
    { id:2, title: '개인 프로젝트 개발', desc:'', checklist:[
      '20210504','20210505','20210507','20210509',
    ] },
    { id:3, title: 'ps', desc:'', checklist:[] },
    { id:4, title: '영어 공부', desc:'', checklist:[] },
    { id:5, title: '기업 조사', desc:'', checklist:[] }
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
    },
    addNewHabit: (state,action: PayloadAction<{ title:string, desc:string }>) => {
      const newHabit:HabitType = {
        id: getNextId(state.habitlist),
        title: action.payload.title,
        desc: action.payload.desc,
        checklist: [],
      }
      console.log(newHabit);
      state.habitlist.push(newHabit);
    },
    updateListOrder: (state,action: PayloadAction<number[]>) => {
      let switchingTarget1 = state.habitlist.find(o => o.id === action.payload[0]);
      let switchingTarget2 = state.habitlist.find(o => o.id === action.payload[1]);

      console.log(switchingTarget1?.id,switchingTarget2?.id);
      // if(switchingTarget1 && switchingTarget2) {
      //   let temp = switchingTarget1.id;
      //   switchingTarget1.id = switchingTarget2.id;
      //   switchingTarget2.id = temp;
      // }
    }
  },
  extraReducers: builder => {
    // builder.addCase(loadInitialData.fulfilled, (state, action) => {
    //   state.cardlist = [ ...action.payload ]
    // })
  },
  
})

export const { updateCurrentRenderDate, updateChecklist, addNewHabit, updateListOrder } = habitlistSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default habitlistSlice.reducer