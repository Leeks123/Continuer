import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fbAuthentication, fbLogIn } from '../../firebase';

export const auth = createAsyncThunk(
  'user/auth',
  async(_,{getState, dispatch}) => {
    const response = await fbAuthentication();
    return response;
  },
)
export const logIn = createAsyncThunk(
  'user/logIn',
  async(_,{getState, dispatch}) => {
    const response = await fbLogIn();
    dispatch(auth());
    return response;
  },
)

interface UserState { 
  isAuth: boolean,
  isLoggedIn: boolean
}
const initialState: UserState = {
  isAuth: false,
  isLoggedIn: false
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // changeDate: (state, action: PayloadAction<DateState>) => {
    //   state.topElDate = action.payload
    // },
    
  },
  extraReducers: builder => {
    builder.addCase(auth.fulfilled, (state, action) => {
      state.isAuth = action.payload
    })
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload
    })
    
  },
  
  
})

export default userSlice.reducer