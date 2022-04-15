import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setUsers } from "../../store/adminSlice";
import { idSelector, usersSelector } from "../../store/selectors";
import UsersList from "./UsersList";
import UserInfo from "./UserInfo";
import Spinner from "../Spinner";

const ProfilesEditor = ({onSaveNewInfo}) => {
  const dispatch = useDispatch();
  const id = useSelector(idSelector);
  const users = useSelector(usersSelector);
  const [profile, setProfile] = useState(null);
  const [newInfo, setNewInfo] = useState(null);

  const handleOption = useCallback((e) => {
    if (e.target.value === -1) {
      setProfile(null);
    } else {
      setProfile(users.find(item => item.id === +e.target.value));
    }
  }, [users]);

  const handleChangeInput = useCallback((e) => {
    const key = e.target.placeholder.split(':')[0].toLowerCase();

    setNewInfo({...newInfo, [key]: e.target.value});
  }, [newInfo]);

  const handleSave = async () => {
    await onSaveNewInfo({...profile, ...newInfo}, 'users');
    setProfile(null);
    setNewInfo(null);
  };

  useEffect(() => {
    dispatch(getUsers(id));
  }, [dispatch, id]);

  return (
    !users ? <Spinner/> : <div className="wrapper">
      <div className="AdminPanel-container">
        <h2 className="Profile-info-container__title">Admin Panel</h2>
        <hr className="Profile__line"/>
        <h3 className="AdminPanel-container-select__subtitle">Выберите пользователя</h3>
        {
          users && <UsersList users={users} onOption={handleOption} profile={profile}/>
        }
        {
          profile && <UserInfo profile={profile} onChangeInfo={handleChangeInput} onSaveInfo={handleSave}/>
        }
      </div>
    </div>
  );
};
export default ProfilesEditor;