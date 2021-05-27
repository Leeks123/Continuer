import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { fbAddHabit, fbDeleteHabit, 
        fbLoadInitiaHabits, fbLoadListOrder, 
        fbUpdateChecklist, fbUpdateHabit, fbUpdateListOrder } from '../../firebase';

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
        id: getNextId((getState() as any).habit.habitlist),
        title: data.title,
        desc: data.desc,
        checklist: [],
    }
    await fbAddHabit(newHabit);
    // listOrder에 대한 추가 dispatch
    dispatch(updateListOrder([...(getState() as any).habit.habitListOrder,newHabit.id]))
    return newHabit;
  },
)
export const updateHabit = createAsyncThunk(
  'habitlist/updateHabit',
  async (data:{ id:number, title:string, desc:string },{getState, dispatch}) => {
    await fbUpdateHabit(data);
    return data;
  },
)
export const deleteHabit = createAsyncThunk(
  'habitlist/deleteHabit',
  async (id:number,{getState, dispatch}) => {
    await fbDeleteHabit(id);
    dispatch(updateListOrder((getState() as any).habit.habitListOrder.filter((order:number) => order !== id)))
    return id;
  },
)
export const updateChecklist = createAsyncThunk(
  'habitlist/updateChecklist',
  async (data:{ id:number,code:string },{getState, dispatch}) => {
    await fbUpdateChecklist(data);
    return data;
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
  habitListOrder: [],
  habitlist: []
}

export const habitlistSlice = createSlice({
  name: 'habitlist',
  initialState,
  reducers: {
    updateCurrentRenderDate: (state, action: PayloadAction<string>) => {
      state.currentPointDate = action.payload
    },
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
      const { id, title, desc } = action.payload;
      state.habitlist = state.habitlist.map(habit =>
        habit.id === id ? { ...habit, title: title, desc: desc } : habit
      )
    })
    builder.addCase(deleteHabit.fulfilled, (state, action) => {
      state.habitlist = state.habitlist.filter((habit) => habit.id !== action.payload );
    })
    builder.addCase(updateChecklist.fulfilled, (state, action) => {
      const { code, id } = action.payload;
      let habit = state.habitlist.find(o => o.id === id);
      if(habit?.checklist.includes(code)) {
        habit.checklist.splice(habit.checklist.indexOf(code),1)
      } else {
        habit?.checklist.push(code);
      }
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