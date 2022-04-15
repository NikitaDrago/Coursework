import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const postNewProfileData = createAsyncThunk(
  'user/fetchLogin',
  async (data) => {
    try {
      await fetch("http://localhost:8080/api/users", {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  // initialState: store.getState(),
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(postNewProfileData.fulfilled, (state, action) => {
      console.log(action.payload);
      console.log('ok');
    });
  }
});

export const {} = userSlice.actions;

export default userSlice.reducer;
