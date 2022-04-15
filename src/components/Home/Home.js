import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearCourse, getAllCourses } from "../../store/coursesSlice";
import { useDispatch, useSelector } from "react-redux";
import { coursesListSelector } from "../../store/selectors";
import Spinner from "../Spinner";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector(coursesListSelector);
  const [spinner, setSpinner] = useState(true);

  const handleCourseCard = (course) => {
    navigate(`/courses/${course.id}`);
  };

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
      </div>
    </div>
  );
};

export default Home;