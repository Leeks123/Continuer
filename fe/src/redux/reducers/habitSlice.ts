import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { fbAddHabit, fbLoadInitiaHabits, fbLoadListOrder, fbUpdateListOrder } from '../../firebase';

export interface HabitType {
  id: number,
  title: string,
  desc: string,
  checklist : string[],
}
interface HabitListState {
  currentPointDate: string,
  habitListOrder: number[],
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

export const loadInitialData = createAsyncThunk(
  'habitlist/loadInitialData',
  async (_,{getState, dispatch}) => {
    // habit list load,
    const habitList = await fbLoadInitiaHabits();
    console.log('habitslice',habitList);
    // list order load,
    const listOrder = await fbLoadListOrder();
    console.log('listOrder',listOrder);
    // habitlist sort by listorder,
    let ret:any[] = [];
    listOrder.forEach((v:number) => {
      ret.push(habitList.find(habit => habit.id === v));
    })
    return { 
      habitlist: ret, listOrder
    };
  },
)
export const addNewHabit = createAsyncThunk(
  'habitlist/addNewHabit',
  async (data:{ title:string, desc:string },{getState, dispatch}) => {
    const newHabit:HabitType = {
        id: getNextId((getState as any).habit.habitlist),
        title: data.title,
        desc: data.desc,
        checklist: [],
      }
    await fbAddHabit(newHabit);
    // listOrder에 대한 추가 dispatch
    dispatch(updateListOrder([...(getState as any).habit.habitListOrder,newHabit.id]))
    return newHabit;
  },
)
export const updateHabit = createAsyncThunk(
  'habitlist/updateHabit',
  async (data:{ id:number, title:string, desc:string },{getState, dispatch}) => {
    // await fbUpdateHabit(data);
    // return data;
  },
)
export const deleteHabit = createAsyncThunk(
  'habitlist/deleteHabit',
  async (id:number,{getState, dispatch}) => {
    // await fbDeleteHabit(id);
    // return id;
  },
)
export const updateChecklist = createAsyncThunk(
  'habitlist/updateChecklist',
  async (data:{ id:number,code:string },{getState, dispatch}) => {
    // await fbUpdateChecklist(data);
    // return data;
  },
)
export const updateListOrder = createAsyncThunk(
  'habitlist/updateListOrder',
  async (order:number[],{getState, dispatch}) => {
    await fbUpdateListOrder(order);
    return order;
  },
)

const initialState: HabitListState = {
  currentPointDate: (new Date()).toString(),
  habitListOrder: [1,2,3,4,5],
  habitlist: [
    // { id:1, title: '1일 1커밋', desc:'', checklist:[
    //   '20210504','20210506','20210507','20210508',
    // ] },
    // { id:2, title: '개인 프로젝트 개발', desc:'', checklist:[
    //   '20210504','20210505','20210507','20210509',
    // ] },
    // { id:3, title: 'ps', desc:'', checklist:[] },
    // { id:4, title: '영어 공부', desc:'', checklist:[] },
    // { id:5, title: '기업 조사', desc:'', checklist:[] }
  ]
}

export const habitlistSlice = createSlice({
  name: 'habitlist',
  initialState,
  reducers: {
    updateCurrentRenderDate: (state, action: PayloadAction<string>) => {
      state.currentPointDate = action.payload
    },
    // updateChecklist: (state,action: PayloadAction<{ id:number,code:string }>) => {
    //   console.log(action.payload);
    //   const { code, id } = action.payload;
    //   let habit = state.habitlist.find(o => o.id === id);
    //   if(habit?.checklist.includes(code)) {
    //     habit.checklist.splice(habit.checklist.indexOf(code),1)
    //   } else {
    //     habit?.checklist.push(code);
    //   }
    // },
    // addNewHabit: (state,action: PayloadAction<{ title:string, desc:string }>) => {
    //   const newHabit:HabitType = {
    //     id: getNextId(state.habitlist),
    //     title: action.payload.title,
    //     desc: action.payload.desc,
    //     checklist: [],
    //   }
    //   console.log(newHabit);
    //   state.habitlist.push(newHabit);
    //   // listOrder에 대한 추가 dispatch 필요
    // },
    // updateHabit: (state,action: PayloadAction<{ id:number, title:string, desc:string }>) => {
    //   const { id, title, desc } = action.payload;
    //   state.habitlist = state.habitlist.map(habit =>
    //     habit.id === id ? { ...habit, title: title, desc: desc } : habit
    //   )
    // },
    // deleteHabit: (state,action: PayloadAction<number>) => {
    //   state.habitlist = state.habitlist.filter((habit) => habit.id !== action.payload );
    //   // listOrder에 대한 추가 dispatch 필요
    // },
    // updateListOrder: (state,action: PayloadAction<number[]>) => {
    //   state.habitListOrder = action.payload;
    // }
  },
  extraReducers: builder => {
    builder.addCase(loadInitialData.fulfilled, (state, action) => {
      state.habitlist = action.payload.habitlist;
      state.habitListOrder = action.payload.listOrder;
    })
    builder.addCase(addNewHabit.fulfilled, (state, action) => {
      state.habitlist = [ ...state.habitlist, action.payload ]
    })
    builder.addCase(updateHabit.fulfilled, (state, action) => {
      // state.cardlist = [ ...action.payload ]
    })
    builder.addCase(deleteHabit.fulfilled, (state, action) => {
      // state.cardlist = [ ...action.payload ]
    })
    builder.addCase(updateChecklist.fulfilled, (state, action) => {
      // state.cardlist = [ ...action.payload ]
    })
    builder.addCase(updateListOrder.fulfilled, (state, action) => {
      state.habitListOrder = [...action.payload]
    })
  }
})

export const { 
  updateCurrentRenderDate
} = habitlistSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default habitlistSlice.reducer