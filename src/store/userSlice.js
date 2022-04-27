import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
};

export const postNewProfileData = createAsyncThunk(
  'user/fetchLogin',
  async ({data, url}) => {
    try {
      await fetch(`http://localhost:8080/api/${url}`, {
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

export const deleteProfile = createAsyncThunk(
  'users/delete',
  async (id) => {
    await fetch(`http://localhost:8080/api/users/${id}`, {
      method: 'DELETE',
    });
  }
);

export const postProfile = createAsyncThunk(
  'users/post',
  async (data) => {
    await fetch(`http://localhost:8080/api/users`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
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
