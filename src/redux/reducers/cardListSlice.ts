import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/configureStore';
import { getMonth } from 'date-fns';

export interface CardState {
  text: string,
  date: string,
}
type DateState = {
  year: number,
  month: number
}
interface CardListState {
    cardlist: CardState[],
    topElDate : DateState,
}
function getDummyCardList():CardState[] {
  const ret = new Array(100).fill(0);
  const now = Date.now();
  return ret.map((v,i) => ({
    text: `${i} sdfjkwjgiajigjidjsigfjwijgia`,
    date: new Date(now - 3600000*6*i).toString(),
  })).reverse();
  
}
const initialState: CardListState = {
  cardlist: getDummyCardList(),
  topElDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  },
}
export const cardlistSlice = createSlice({
  name: 'cardlist',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CardState>) => {
      state.cardlist = [
        ...state.cardlist, action.payload
      ]
    },
    changeDate: (state, action: PayloadAction<DateState>) => {
      state.topElDate = action.payload
    }
    // decrement: state => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //     state.value += action.payload
    //   }
  }
})

// Action creators are generated for each case reducer function
export const { addCard, changeDate } = cardlistSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default cardlistSlice.reducer