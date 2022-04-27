import { createAsyncThunk } from "@reduxjs/toolkit";

export const EditCourse = createAsyncThunk(
  'course/edit',
  async (data) => {
    const res = await fetch('https://localhost:8080/api/courses', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    res.then(res => res.json()).then(res => console.log(res));
  }
);