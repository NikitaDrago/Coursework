import img from '../../img/profile_img.png';
import { useSelector } from "react-redux";
import { idSelector, loginSelector, passwordSelector, roleSelector } from "../../store/selectors";
import { useCallback, useState } from "react";

const Profile = ({setSpinner, onSaveNewInfo}) => {
  const userId = useSelector(idSelector);
  const role = useSelector(roleSelector);
  const login = useSelector(loginSelector);
  const pass = useSelector(passwordSelector);
  const [isEdit, setIsEdit] = useState(false);
  const [editLogin, setEditLogin] = useState('');
  const [editPass, setEditPass] = useState('');

  const handleSave = useCallback(() => {
    const data = {
      id: userId,
      login: editLogin || login,
      password: editPass || pass,
      role,
    };

    onSaveNewInfo(data, 'profile');
  }, [editLogin, editPass, login, onSaveNewInfo, pass, role, userId]);

  return (
    <div className="wrapper">
      <div className="Profile-container">
        <img src={img} alt="" className="Profile-container__photo"/>
        <div className="Profile-info-wrapper">
          <div className="Profile-info-container">
            <h2 className="Profile-info-container__title">Фамилия Имя Отчество</h2>
            <hr className="Profile__line"/>
            {
              isEdit ? <>
                  <input placeholder={`Старый логин: ${login}`} className="input Profile-info-container__input"
                         onChange={(e) => setEditLogin(e.target.value)}/>
                  <input placeholder={`Старый пароль: ${pass}`} className="input Profile-info-container__input"
                         onChange={(e) => setEditPass(e.target.value)}/>
                </>
                : <>
                  <span className="Profile-info-container__item">Логин: <i>{login}</i></span>
                  <span className="Profile-info-container__item">Пароль: <i>{pass}</i></span>
                  <span className="Profile-info-container__item">Роль: <i>{role.toLowerCase()}</i></span>
                </>
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
                        onClick={() => {
                          setSpinner(true);
                          setIsEdit(!isEdit);
                          handleSave();
                        }}
                >
                  Сохранить
                </button>
              </div>
              : <button className="button CourseInfo-admin__button Profile__button"
                        onClick={() => setIsEdit(!isEdit)}>
                Редактировать Профиль
              </button>
          }

        </div>
      </div>
    </div>
  );
};

export default Profile;