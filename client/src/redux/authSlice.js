import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null, // Default: No user ID
  token: null,  // Default: No token
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.userId; // Set userId from payload
      state.token = action.payload.token;   // Set token from payload
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;