import { useDispatch, useSelector } from "react-redux";
import { idSelector, infoSelector, loginSelector, passwordSelector, roleSelector } from "../../store/selectors";
import { useEffect, useRef, useState } from "react";
import ProfileEdit from "./ProfileEdit";
import ProfileInfo from "./ProfileInfo";
import { getUserCourses } from "../../fetches/distributions";
import CourseCard from "../Home/CourseCard";
import { useNavigate } from "react-router-dom";

const Profile = ({setSpinner, onSaveNewInfo}) => {
  const userId = useSelector(idSelector);
  const role = useSelector(roleSelector);
  const login = useSelector(loginSelector);
  const pass = useSelector(passwordSelector);
  const info = useSelector(infoSelector);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userCourse, setUserCourse] = useState();

  const newLogin = useRef();
  const newPass = useRef();

  const newName = useRef();
  const newSurname = useRef();
  const newPhone = useRef();
  const newEmail = useRef();
  const newAgeOrEducation = useRef();

  const handleSave = () => {
    const data = info ? {
        account: {
          id: info.account.id,
          login: newLogin.current.value || info.account.login,
          password: newPass.current.value || info.account.password,
          role: info.account.role,
        },
        name: newName.current.value || info.name,
        surname: newSurname.current.value || info.surname,
        phone: newPhone.current.value || info.phone,
        email: newEmail.current.value || info.email,
        [info.account.role === 'TEACHER' ? 'education' : 'age']: newAgeOrEducation.current.value || info.age || info.education,
        [info.account.role === 'TEACHER' ? 'courses' : 'distributions']: info.courses || info.distributions || null,
      }
      :
      {
        id: userId,
        login: newLogin.current.value || login,
        password: newPass.current.value || pass,
        role,
      };

    if (JSON.stringify(data) === JSON.stringify(info) || (role && newPass.current.value && newLogin.current.value)) {
      setIsError(true);
      return;
    }

    setSpinner(true);
    setIsEdit(!isEdit);
    onSaveNewInfo(data, role || info.account.role);
  };

  const handleCourseCard = (course) => {
    navigate(`/courses/${course.id}`);
  };

  useEffect(() => {
    const {account: {id, role}} = info;

    if (role === 'STUDENT') {
      getUserCourses(id).then(res => setUserCourse(res[0].course));
    }
  }, []);

  return (
    <div className="wrapper">
      <div className="Profile-info-wrapper">
        <div className="Profile-info-container">
          {isError && <h3 className="Modal-form__subtitle">Вы ничего не изменили</h3>}
          {
            isEdit ?
              <ProfileEdit isError={isError} setIsError={setIsError} newLogin={newLogin} newPass={newPass}
                           newName={newName} newSurname={newSurname} newPhone={newPhone} newEmail={newEmail}
                           newAgeOrEducation={newAgeOrEducation}
              />
              : <ProfileInfo info={info} role={role} login={login} pass={pass}/>
          }
        </div>
        {
          isEdit ?
            <div className="Profile-edit">
              <button className="button button_negative CourseInfo-admin__button"
                      onClick={() => setIsEdit(!isEdit)}>
                Отменить редактирование
              </button>
              <button className="button CourseInfo-admin__button"
                      onClick={() => handleSave()}>
                Сохранить
              </button>
            </div>
            : <button className="button CourseInfo-admin__button Profile__button"
                      onClick={() => setIsEdit(!isEdit)}>
              Редактировать Профиль
            </button>
        }
        <hr className="Profile__line"/>

        {
          userCourse && <>
            <h2 className="Profile-info-container__title">Активный курс</h2>
            <CourseCard course={userCourse} onCourseCard={handleCourseCard}/>
          </>
        }
      </div>
    </div>
  );
};

export default Profile;