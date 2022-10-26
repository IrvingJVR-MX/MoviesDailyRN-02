import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {userState} from "../utils/Types"

const initialState: userState = {
  id:"",
  email:""
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action:PayloadAction<userState>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    logout: (state) => {
      state.email = null;
      state.id = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
