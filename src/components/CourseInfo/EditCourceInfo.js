import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { roleSelector } from "../../store/selectors";

const EditCourceInfo = () => {
  const {id} = useParams();
  const role = useSelector(roleSelector);

  return (
    <div className="wrapper" style={{display: 'flex', flexDiretion: 'column'}}>
      <input placeholder="Название курса" className="input CourseInfo-container__input"/>
      <input placeholder="Кол-во недель обучения: 10" className="input CourseInfo-container__input"/>
      <textarea placeholder="Информация о курсе"
                className="input CourseInfo-container__input CourseInfo-container__textarea"/>
      <div className="CourseInfo-container-lecturer">
        <hr className="Profile__line"/>
        <input placeholder="Фамилия" className="input CourseInfo-container__input"/>
        {/*<span className="CourseInfo-container-lecturer__FI">name surname</span>*/}
        <span className="CourseInfo-container-lecturer__education">education</span>
        <span className="CourseInfo-container-lecturer__phone">phone</span>
        <span className="CourseInfo-container-lecturer__email">email</span>
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

export default EditCourceInfo;