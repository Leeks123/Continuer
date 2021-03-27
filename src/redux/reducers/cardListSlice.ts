import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/configureStore';
import { getMonth } from 'date-fns';

export interface CardState {
  text: string,
  date: string,
}
interface CardListState {
    cardlist: CardState[],
    month: number,
}
function getDummyCardList():CardState[] {
  const ret = new Array(30).fill(0);
  const now = Date.now();
  return ret.map((v,i) => ({
    text: `${i} sdfjkwjgiajigjidjsigfjwijgia`,
    date: new Date(now - 3600000*6*i).toString(),
  })).reverse();
  
}
const initialState: CardListState = {
  cardlist: getDummyCardList(),
  month: getMonth(new Date()),
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
    changeMonth: (state, action: PayloadAction<number>) => {
      state.month = action.payload
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
export const { addCard, changeMonth } = cardlistSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default cardlistSlice.reducer