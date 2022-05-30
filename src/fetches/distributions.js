import { distributionURL } from "../constants";

export const getUserCourses =
  async (id) => {
    const response = await fetch(`${distributionURL}/by/student/${id}`);

    return response.json();
  };

export const postUserCourse = async (data) => {
  const res = await fetch(distributionURL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const deleteUserCourse = async (id) => {
  await fetch(`${distributionURL}/${id}`, {
    method: 'DELETE'
  });
};