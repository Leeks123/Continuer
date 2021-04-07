import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState, AppDispatch } from '../store/configureStore';
import { getMonth } from 'date-fns';
import Content from '../../component/Timeline/Content';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export interface CardState {
  id: number,
  text: string,
  createdAt: string,
  images: string[] | null
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
// function getDummyCardList():CardState[] {
//   const ret = new Array(300).fill(0);
//   const now = Date.now();
//   return ret.map((v,i) => ({
//     id: 300-i,
//     text: `${i} sdfjkwjgiajigjidjsigfjwijgia`,
//     createdAt: new Date(now - 3600000*6*i).toString(),
//     images: null
//   }));
// }
// const data = getDummyCardList();
// let offset = 0;
// function getPageData() {
//   let ret = data.slice(offset,offset+10);
//   offset += 10;
//   return ret.reverse();
// }

export const loadInitialData = createAsyncThunk(
  'cardlist/loadInitialData',
  async (_,{getState, dispatch}) => {
    const response = await axios.get(`/cards`);
    console.log(response.data);
    dispatch(updateLastID(response.data[response.data.length-1].id))
    return (response.data as CardState[]).reverse();
  },
)
export const loadPageData = createAsyncThunk(
  'cardlist/loadPageData',
  async (_,{getState, dispatch}) => {
    const { lastID } = (getState() as any).content;
    const response = await axios.get(`/cards/${lastID}`);
    dispatch(updateLastID(response.data[0].id))
    console.log(response.data);

    // await dispatch(updateLastID(data[data.length-1].id));
    
    return response.data as CardState[];
  },
)
export const deleteCard = createAsyncThunk(
  'cardlist/deleteCard',
  async (cardId:number, dispatch) => {
    const response = await axios.delete(`/cards/${cardId}`);
    console.log('deleteCard',cardId,response);
    return cardId;
  },
)
export const addCard = createAsyncThunk(
  'cardlist/addCard',
  async (cardText:string) => {
    const response = await axios.post('/cards',{
      text: cardText
    });
    console.log('addcard res',response);
    return response.data;
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
    builder.addCase(loadInitialData.fulfilled, (state, action) => {
      state.cardlist = [ ...action.payload ]
    })
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