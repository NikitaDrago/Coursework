export const idSelector = (state) => state.auth.id;
export const isAuthSelector = (state) => state.auth.isAuth;
export const loginSelector = (state) => state.auth.login;
export const passwordSelector = (state) => state.auth.password;
export const roleSelector = (state) => state.auth.role;
export const hasErrorSelector = state => state.auth.hasError;

export const infoSelector = state => state.auth.info;

//------Admin
export const usersSelector = state => state.admin.users;

//-----Courses
export const coursesListSelector = state => state.courses.coursesList;
export const courseSelector = state => state.courses.course;

export const userCourseSelector = state => state.courses.userCourse;