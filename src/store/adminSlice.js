import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null
};

export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async (id) => {
    const res = fetch('http://localhost:8080/api/users');
    return await res.then(res => res.json()).then(res => res.filter(item => item.id !== id));
  }
);

// export const setUsers = createAsyncThunk(
//   'admin/setUsers',
//   async (data) => {
//     const res = await fetch('http://localhost:8080/api/users', {
//       method: 'PUT',
//       headers: {
//         "Content-Type": "application/json",
//         Accept: 'application/json'
//       },
//       body: JSON.stringify(data)
//     });
//
//     return await res.json();
//   }
// );

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers: (state, action) => state.users = action.payload
  },
  extraReducers: builder => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  }
});

export const { setUsers } = adminSlice.actions;

export default adminSlice.reducer;