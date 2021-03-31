import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
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
    firstRender: boolean,
    scrollState: boolean,
    error: null | string,
}
function getDummyCardList():CardState[] {
  const ret = new Array(300).fill(0);
  const now = Date.now();
  return ret.map((v,i) => ({
    text: `${i} sdfjkwjgiajigjidjsigfjwijgia`,
    date: new Date(now - 3600000*6*i).toString(),
  }));
}
const data = getDummyCardList();
let offset = 0;
function getPageData() {
  let ret = data.slice(offset,offset+10);
  offset += 10;
  return ret.reverse();
}


export const loadPageData = createAsyncThunk(
  'cardlist/loadPageData',
  async (thunkAPI) => {
    try {
      const data = await getPageData();
      return data as CardState[];
    } catch(err) {
      return err.toString();
    }
  },
)


const initialState: CardListState = {
  cardlist: [],
  topElDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  },
  firstRender: false,
  scrollState: false,
  error: null
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
    },
    firstRenderFin: (state, action: PayloadAction<boolean>) => {
      state.firstRender = action.payload
    },
    prepareLoadData: (state, action: PayloadAction<boolean>) => {
      state.scrollState = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(loadPageData.fulfilled, (state, action) => {
      state.cardlist = [...action.payload, ...state.cardlist]
    })
  },
  
})

// Action creators are generated for each case reducer function
export const { addCard, changeDate, firstRenderFin, prepareLoadData } = cardlistSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default cardlistSlice.reducer