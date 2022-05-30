import { createAsyncThunk } from "@reduxjs/toolkit";
import { courseUrl, usersUrl, url} from "../constants";

export const postNewProfileData = createAsyncThunk(
  'user/fetchLogin',
  async ({data, api}) => {
    try {
      await fetch(`${url}/api/${api}`, {
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
    await fetch(`${usersUrl}/${id}`, {
      method: 'DELETE',
    });
  }
);

export const postProfile = createAsyncThunk(
  'users/post',
  async (data) => {
    await fetch(courseUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
);