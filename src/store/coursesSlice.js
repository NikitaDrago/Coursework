import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { courseUrl } from "../constants";

const initialState = {
  coursesList: null,
  course: null,
  userCourse: null
};

export const putCourse = createAsyncThunk(
  'courses/put',
  async (data) => {
    await fetch(courseUrl, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
);


export const postCourse = createAsyncThunk(
  'courses/post',
  async (data) => {
    await fetch(courseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/delete',
  async (id) => {
    await fetch(`${courseUrl}/${id}`,
      {
        method: 'DELETE',
      }
    );
  }
);

export const getAllCourses = createAsyncThunk(
  'courses/getDataAll',
  async () => {
    const res = fetch(courseUrl);
    return (await res).json();
  }
);

export const getCourseById = createAsyncThunk(
  'courses/getById',
  async (id) => {
    const res = fetch(`${courseUrl}/${id}`);
    return (await res).json();
  }
);

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearCourse: state => {
      state.course = null;
    },
    setUserCourse: state => {
      state.userCourse = state.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      state.coursesList = action.payload;
    });

    builder.addCase(getCourseById.fulfilled, (state, action) => {
      state.course = action.payload;
    });
  }
});

export const {clearCourse, setUserCourse} = coursesSlice.actions;

export default coursesSlice.reducer;