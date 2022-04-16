import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setUsers } from "../../store/adminSlice";
import { idSelector, usersSelector } from "../../store/selectors";
import UsersList from "./UsersList";
import UserInfo from "./UserInfo";
import Spinner from "../Spinner";
import { deleteProfile, postProfile } from "../../store/userSlice";

const ProfilesEditor = ({onSaveNewInfo}) => {
  const dispatch = useDispatch();
  const id = useSelector(idSelector);
  const users = useSelector(usersSelector);
  const [profile, setProfile] = useState(null);
  const [newInfo, setNewInfo] = useState(null);
  const [spinner, setSpinner] = useState(false);

  const handleOption = useCallback((e) => {
    if (e.target.value === -1) {
      setProfile(null);
    } else {
      setProfile(users.find(item => item.id === +e.target.value));
    }
  }, [users]);

  const handleChangeInput = useCallback((e) => {
    if (e.target.placeholder) {
      const key = e.target.placeholder.split(':')[0].toLowerCase();
      setNewInfo({...newInfo, [key]: e.target.value});
    } else {
      setNewInfo({...newInfo, role: e.target.value});
    }

  }, [newInfo]);

  const handleSave = async () => {
    await onSaveNewInfo({...profile, ...newInfo}, 'users');
    setProfile(null);
    setNewInfo(null);
    setSpinner(false);
  };

  const handleDeleteProfile = useCallback(async () => {
    await dispatch(deleteProfile(profile.id));
    setSpinner(false);
  }, [dispatch, profile]);

  const handleAddProfile = useCallback(async () => {
    await dispatch(postProfile(newInfo));
    setProfile(null)
    setNewInfo(null);
    setSpinner(false);
  }, [dispatch, newInfo]);

  useEffect(() => {
    dispatch(getUsers(id));
  }, [dispatch, id]);

  return (
    !users ? <Spinner/> : <div className="wrapper">
      {
        spinner && <Spinner/>
      }
      <div className="AdminPanel-container">
        <h2 className="Profile-info-container__title">Admin Panel</h2>
        <hr className="Profile__line"/>
        <h3 className="AdminPanel-container-select__subtitle">Выберите пользователя</h3>
        {
          users && <UsersList users={users} onOption={handleOption} profile={profile}/>
        }
        {
          profile && <UserInfo profile={profile}
                               onChangeInfo={handleChangeInput}
                               onSaveInfo={handleSave}
                               onDeleteProfile={handleDeleteProfile}
                               setSpinner={setSpinner}
                               newInfo={newInfo}
          />
        }
        <hr className="Profile__line" style={{marginTop: '20px'}}/>
        <h3 className="AdminPanel-container-select__subtitle">Добавить нового пользователя</h3>
        {
          <UserInfo onChangeInfo={handleChangeInput} onSaveInfo={handleAddProfile} newInfo={newInfo}
                    setSpinner={setSpinner}/>
        }
      </div>
    </div>
  );
};
export default ProfilesEditor;