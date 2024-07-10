import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    /*
        "id": 1,
        "email": "user1@jobhunter.hu",
        "fullname": "Jake Peralta",
        "role": "company"
    */
    accessToken: null,
  },
  reducers: {
    login: (state, { payload: { user, accessToken } }) => {
      state.user = user;
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.accessToken;
