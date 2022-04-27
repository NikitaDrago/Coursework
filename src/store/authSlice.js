import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasError: false,
  isAuth: false,
  id: null,
  login: null,
  password: null,
  role: null,
  info: null
};

export const authLogin = createAsyncThunk(
  'auth/login',
  async ({login, password}, {rejectWithValue}) => {
    const formData = new FormData();
    formData.append("login", login);
    formData.append("password", password);

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        body: formData
      });

      return response.json();
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
      if (action.payload?.role === 'ADMIN') {
        return {...action.payload, isAuth: true};
      } else {
        state.info = action.payload
        state.isAuth = true
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(authLogin.fulfilled, (state, action) => {
      if (action.payload?.role === 'ADMIN') {
        state.id = action.payload.id;
        state.login = action.payload.login;
        state.password = action.payload.password;
        state.role = action.payload.role;
      } else {
        state.info = action.payload;
      }

      state.isAuth = true;
    })
      .addCase(authLogin.rejected, (state, action) => {
        state.hasError = true;
      });
  }
});

export const {clearProfile, setNewData} = authSlice.actions;

export default authSlice.reducer;