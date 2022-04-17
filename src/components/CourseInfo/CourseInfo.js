import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseSelector, roleSelector } from "../../store/selectors";
import { getCourseById } from "../../store/coursesSlice";
import Spinner from "../Spinner";

const CourseInfo = () => {
  const {id} = useParams();
  const role = useSelector(roleSelector);
  const dispatch = useDispatch();
  const course = useSelector(courseSelector);

  useEffect(() => {
    dispatch(getCourseById(id));
  }, [dispatch, id]);

  return (
    !course ? <Spinner/> : <div className="wrapper">
      <h1 className="CourseInfo-container__title">
        {course.name}
      </h1>
      <h5 className="CourseInfo-container__subtitle">
        Кол-во недель обучения: {course.weeks}
      </h5>
      <p className="CourseInfo-container__description">
        {course.description}
      </p>
      <div className="CourseInfo-container-lecturer">
        <hr className="Profile__line"/>
        <span className="CourseInfo-container-lecturer__FI">{course.lecturer.name} {course.lecturer.surname}</span>
        <span className="CourseInfo-container-lecturer__education">{course.lecturer.education}</span>
        <span className="CourseInfo-container-lecturer__phone">{course.lecturer.phone}</span>
        <span className="CourseInfo-container-lecturer__email">{course.lecturer.email}</span>
      </div>
      {
        role === 'ADMIN' && <div className="CourseInfo-admin">
          <button className="button CourseInfo-admin__button ">Редактировать курс</button>
          <button className="button button_negative CourseInfo-admin__button">Удалить</button>
        </div>
      }
    </div>
  );
};

export default CourseInfo;