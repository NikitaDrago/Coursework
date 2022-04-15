import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { roleSelector } from "../../store/selectors";
import { COURSES } from "../Home/Home";

const EditCourceInfo = () => {
  const {id} = useParams();
  const [course, setCourse] = useState();
  const role = useSelector(roleSelector);

  useEffect(() => {
    const response = COURSES.find(item => item.title.split(' ').join('') === id);
    setCourse(response);
  }, []);

  return (
    <div className="wrapper">
      {course &&
      <div className="CourseInfo-container">
        <h1 className="CourseInfo-container__title">
          {course.title}
        </h1>
        <h5 className="CourseInfo-container__subtitle">
          Кол-во недель обучения: {course.weeks}
        </h5>
        <p className="CourseInfo-container__description">
          {course.description}
        </p>
        {role === 'STUDENT' && <div className="CourseInfo-admin">
          <button className="button CourseInfo-admin__button ">Редактировать курс</button>
          <button className="button button_negative CourseInfo-admin__button">Удалить</button>
        </div>}
      </div>
      }
    </div>
  );
};