import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from '../store/configureStore';
import { getMonth } from 'date-fns';
import Content from '../../component/Timeline/Content';

export interface CardState {
  id: number,
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
    scrollState: boolean,
    error: null | string,
    lastID: number
}
function getDummyCardList():CardState[] {
  const ret = new Array(300).fill(0);
  const now = Date.now();
  return ret.map((v,i) => ({
    id: 300-i,
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
  async (_,{getState, dispatch}) => {
    // console.log(thunkApi);
    const data = await getPageData();
    const { content } = getState() as any;
    if(content.lastID === 0) {
      await dispatch(updateLastID(data[data.length-1].id));
    }
    return data as CardState[];
  },
)
export const deleteCard = createAsyncThunk(
  'cardlist/deleteCard',
  async (cardId:number, {dispatch}) => {
    // const response = await axios.delete('');
    console.log('deleteCard',cardId);
    return cardId;
  },
)
export const addCard = createAsyncThunk(
  'cardlist/addCard',
  async (card:CardState) => {
    // const response = await axios.post('');
    return card;
  },
)


const initialState: CardListState = {
  cardlist: [],
  topElDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  },
  scrollState: false,
  lastID: 0,
  error: null
}

export const cardlistSlice = createSlice({
  name: 'cardlist',
  initialState,
  reducers: {
    changeDate: (state, action: PayloadAction<DateState>) => {
      state.topElDate = action.payload
    },
    prepareLoadData: (state, action: PayloadAction<boolean>) => {
      state.scrollState = action.payload
    },
    updateLastID: (state, action: PayloadAction<number>) => {
      state.lastID = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(loadPageData.fulfilled, (state, action) => {
      state.cardlist = [...action.payload, ...state.cardlist]
    })
    builder.addCase(deleteCard.fulfilled, (state, action) => {
      state.cardlist = state.cardlist.filter((list) => list.id !== action.payload)
    })
    builder.addCase(addCard.fulfilled, (state, action) => {
      state.cardlist = [
        ...state.cardlist, action.payload
      ]
    })
  },
  
})

// Action creators are generated for each case reducer function
export const { changeDate, prepareLoadData, updateLastID } = cardlistSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default cardlistSlice.reducer