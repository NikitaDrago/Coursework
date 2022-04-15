import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  id: null,
  login: null,
  password: null,
  role: null,
};
// const initialState = {
//   isAuth: true,
//   id: 1,
//   login: "admin1",
//   password: "pass",
//   role: "ADMIN"
// };

export const authLogin = createAsyncThunk(
  'auth/login',
  async ({login, password}) => {
    const formData = new FormData();
    formData.append("login", login);
    formData.append("password", password);

    const response = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      body: formData
    });
    return await response.json();
  }
);

export const authLogout = createAsyncThunk(
  'auth/logout',
  async () => {
    await fetch('https://social-network.samuraijs.com/api/1.0/auth/login', {
      method: 'DELETE',
      headers: {
        'API-KEY': '6cd6c668-32cb-4e5d-b0e5-dc91f32bab88',
      },
      credentials: 'include',
    });
  }
);


// export const authMe = createAsyncThunk(
//   'auth/me',
//   async () => {
//     const res = await fetch('https://social-network.samuraijs.com/api/1.0/auth/me', {
//       headers: {
//         'API-KEY': '6cd6c668-32cb-4e5d-b0e5-dc91f32bab88',
//         'Accept': 'application/json',
//       },
//       credentials: 'include',
//     });
//     return await res.json();
//   }
// );

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // clearProfile: state => {
    //   state.isAuth = false;
    //   state.id = null;
    //   state.login = null;
    //   state.password = null;
    //   state.role = null;
    // },
    clearProfile: () => {
      return {
        isAuth: false,
        id: null,
        login: null,
        password: null,
        role: null,
      };
    },
    setNewData: (state, action) => {
      return {...action.payload, isAuth: true};
    },
  },
  extraReducers: builder => {
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.password = action.payload.password;
      state.role = action.payload.role;

      state.isAuth = true;
    });
    //   .addCase(authMe.fulfilled, (state, action) => {
    //   console.log(action.payload.data);
    //   if (action.payload.data.resultCode !== 1) {
    //     state.isAuth = true;
    //     state.id = action.payload.data.userId;
    //   }
    // }).addCase(authLogout.fulfilled, (state, action) => {
    //   console.log(action.payload);
    //   state.isAuth = false;
    //   state.id = null;
    //   state.email = null;
    //   state.login = null;
    // });
  }
});

export const {clearProfile, setNewData} = authSlice.actions;

export default authSlice.reducer;