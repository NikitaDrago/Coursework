import { distributionURL } from "../constants";

export const getUserCourses =
  async (id) => {
    const response = await fetch(`${distributionURL}/by/student/${id}`);

    if (!response.ok) {
      return {res: null};
    }
    return response.json();
  };

export const postUserCourse = async (data) => {
  await fetch(distributionURL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
};

export const deleteUserCourse = async (id) => {
  await fetch(`${distributionURL}/${id}`, {
    method: 'DELETE'
  });
};