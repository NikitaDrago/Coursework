import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  coursesList: null,
  course: null
};

export const putCourse = createAsyncThunk(
  'courses/put',
  async (data) => {
    await fetch('http://localhost:8080/api/courses', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
);


export const deleteCourse = createAsyncThunk(
  'courses/delete',
  async (id) => {
    await fetch(`http://localhost:8080/api/courses/${id}`,
      {
        method: 'DELETE',
      }
    );
  }
);

export const getAllCourses = createAsyncThunk(
  'courses/getDataAll',
  async () => {
    const res = fetch('http://localhost:8080/api/courses');
    return (await res).json();
  }
);

export const getCourseById = createAsyncThunk(
  'courses/getById',
  async (id) => {
    const res = fetch(`http://localhost:8080/api/courses/${id}`);
    return (await res).json();
  }
);

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearCourse: state => {
      state.course = null;
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

export const {clearCourse} = coursesSlice.actions;

export default coursesSlice.reducer;