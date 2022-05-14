import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/adminSlice";
import { idSelector, usersSelector } from "../../store/selectors";
import UsersList from "./UsersList";
import EditUserInfo from "./EditUserInfo";
import Spinner from "../Spinner";
import { deleteProfile, postProfile } from "../../store/userSlice";

const ProfilesEditor = ({onSaveNewInfo}) => {
  const dispatch = useDispatch();
  const id = useSelector(idSelector);
  const users = useSelector(usersSelector);
  const [profile, setProfile] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const newLogin = useRef();
  const newPass = useRef();
  const newRole = useRef();
  const [isError, setIsError] = useState(false);

  const handleOption = useCallback((e) => {
    if (e.target.value === -1) {
      setProfile(null);
    } else {
      setProfile(users.find(item => item.id === +e.target.value));
    }
  }, [users]);

  const handleSave = useCallback(() => {
    const newInfo = {
      id: profile.id,
      login: newLogin.current?.value || profile.login,
      password: newPass.current?.value || profile.password,
      role: newRole.current?.value || profile.role,
    };

    onSaveNewInfo({...profile, ...newInfo}, 'users')
      .then(() => {
        setProfile(null);
        setSpinner(false);
      });
  }, [onSaveNewInfo, profile]);

  const handleDeleteProfile = useCallback(() => {
    Promise
      .all(dispatch(deleteProfile(profile.id)), dispatch(getUsers(id)))
      .then(() => {
        setProfile(null);
        setSpinner(false);
      });
  }, [dispatch, id, profile]);

  const handleAddProfile = useCallback(() => {
    const login = newLogin && newLogin.current?.value;
    const password = newPass && newPass.current?.value;

    if (login && password) {
      const newInfo = {
        login,
        password,
        role: newRole.current?.value,
      };

      newLogin.current.value = '';
      newPass.current.value = '';
      newRole.current.value = 'STUDENT';

      Promise
        .all([dispatch(postProfile(newInfo)), dispatch(getUsers(id))])
        .then(() => {
          setProfile(null);
          setSpinner(false);
        });
    } else {
      setIsError(true);
      setSpinner(false);
    }

  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getUsers(id));
  }, [dispatch, id]);

  return (
    !users ? <Spinner/> : <div className="wrapper">
      {spinner && <Spinner/>}
      <div className="AdminPanel-container">
        <h2 className="Profile-info-container__title">Admin Panel</h2>
        <hr className="Profile__line"/>
        <h3 className="AdminPanel-container-select__subtitle">Выберите пользователя</h3>
        {
          users && <UsersList users={users} onOption={handleOption} profile={profile}/>
        }
        {
          profile && <EditUserInfo changeLogin={newLogin} changePass={newPass} changeRole={newRole} profile={profile}
                                   onSaveInfo={handleSave} onDeleteProfile={handleDeleteProfile} setSpinner={setSpinner}
          />
        }
        <hr className="Profile__line" style={{marginTop: '20px'}}/>
        <h3 className="AdminPanel-container-select__subtitle">Добавить нового пользователя</h3>
        {isError &&
        <h4 className="AdminPanel-container-select__subtitle subtitle_negative">Требуется заполнить все поля</h4>}
        {
          <EditUserInfo changeLogin={newLogin} changePass={newPass} changeRole={newRole} onSaveInfo={handleAddProfile}
                        setSpinner={setSpinner} isError={isError} setIsError={setIsError}/>
        }
      </div>
    </div>
  );
};
export default ProfilesEditor;