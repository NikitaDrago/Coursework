import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { clearCourse, getAllCourses } from "../../store/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import { coursesListSelector, isAuthSelector, roleSelector } from "../../store/selectors";
import Spinner from "../Spinner";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector(coursesListSelector);
  const [spinner, setSpinner] = useState(true);
  const isAuth = useSelector(isAuthSelector);
  const role = useSelector(roleSelector);

  const handleCourseCard = useCallback((course) => {
    navigate(`/courses/${course.id}`);
  }, [navigate]);

  // const handleEditCourse = () => {
  //   navigate(`/courses/edit`);
  // };

  const fetchData = async () => {
    await dispatch(getAllCourses());
    await dispatch(clearCourse());
    setSpinner(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    spinner ? <Spinner/> : <div className="wrapper">
      <h2 className="Home-wrapper__title">Доступные курсы</h2>
      <div className="Home-container">
        {
          courses && courses.map(course => <CourseCard
            key={`${course.name}_${Date.now()}`}
            course={course}
            onCourseCard={handleCourseCard}
          />)
        }
        {
          isAuth && (role === 'ADMIN' || role === 'TEACHER') && <div className="Home-container__item Home-container__addCourse"/>
        }
      </div>
    </div>
  );
};

export default Home;