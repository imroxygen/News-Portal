import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    signInSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    signInFaliure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },

    updateStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    updateSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    updateFaliure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    deleteUserStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    deleteUserSuccess: (state) => {
      (state.currentUser = null),
        (state.loading = false),
        (state.error = null);
    },
    deleteUserFaliure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    signoutSuccess:(state)=>{
      state.currentUser=null,
      state.error=null,
      state.loading=false
    }
  },
});

export const {
  signInFaliure,
  signInStart,
  signInSuccess,
  updateFaliure,
  updateStart,
  updateSuccess,
  deleteUserFaliure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess
} = userSlice.actions;

export default userSlice.reducer;
