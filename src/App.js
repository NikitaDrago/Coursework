import { Route, Routes, useNavigate } from "react-router-dom";
import './styles/style.sass';
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import AccountModal from "./components/AccountModal/AccountModal";
import { useCallback, useState } from "react";
import Profile from "./components/Profile/Profile";
import { authLogin, clearProfile, setNewData } from "./store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { idSelector, infoSelector, isAuthSelector, roleSelector } from "./store/selectors";
import ProfilesEditor from "./components/AdminPanel/ProfilesEditor";
import { postNewProfileData } from "./fetches/user";
import { getUsers } from "./store/adminSlice";
import Spinner from "./components/Spinner";
import EditCourceInfo from "./components/Course/EditCourceInfo";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Course from "./components/Course/Course";
import AddCourse from "./components/Course/AddCourse";

const App = () => {
  const id = useSelector(idSelector);
  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector(roleSelector);
  const info = useSelector(infoSelector);

  const handleClickModal = useCallback(() => setModal(!modal), [modal]);

  const handleLogout = useCallback(() => {
    dispatch(clearProfile());
    navigate('/');
  }, [dispatch, navigate]);

  const handleLogin = (login, password, closeModal) => {
    dispatch(authLogin({login, password}))
      .then(res => res.meta.requestStatus === "fulfilled" && closeModal())
      .then(() => setSpinner(false));
  };

  const saveNewInfo = useCallback(async (data, type) => {
    let url = 'users';

    if (type === 'TEACHER') {
      url = 'lecturers';
    } else if (type === 'STUDENT') {
      url = 'students';
    }

    try {
      console.log({data, api: url})
      await dispatch(postNewProfileData({data, api: url}));

      switch (type) {
        case 'ADMIN': {
          await dispatch(setNewData(data));
          break;
        }
        case 'TEACHER': {
          await dispatch(setNewData(data));
          break;
        }
        case 'STUDENT': {
          await dispatch(setNewData(data));
          break;
        }
        case 'users': {
          await dispatch(getUsers(id));
          break;
        }
        default:
          break;
      }
    } catch (e) {
      console.log(e);
    }

    setSpinner(false);
  }, [dispatch, id]);

  return (
    <>
      {modal && <AccountModal onClickModal={handleClickModal} onLogin={handleLogin} setSpinner={setSpinner}/>}
      <Header onClickModal={handleClickModal} onLogout={handleLogout}/>

      {
        spinner && <Spinner/>
      }

      <Routes>
        <Route path="*" element={<ErrorPage navigate={navigate}/>}/>
        <Route path="/" element={<Home setSpinner={setSpinner}/>}/>
        <Route path="/courses/:id" element={<Course/>}/>
        {
          isAuth && (role === 'ADMIN' || info.account.role === 'TEACHER') && [
            <Route key={'addcourse'} exact path="/courses/add" element={<AddCourse/>}/>,
            <Route key={'editcourse'} exact path="/courses" element={<EditCourceInfo/>}/>
          ]
        }
        {
          isAuth &&
          <Route path="/profile" element={<Profile setSpinner={setSpinner} onSaveNewInfo={saveNewInfo}/>}/>
        }
        {
          isAuth && role === 'ADMIN' &&
          <Route path="/panel"
                 element={<ProfilesEditor setSpinner={setSpinner} onSaveNewInfo={saveNewInfo}/>}/>
        }
      </Routes>
    </>
  );
};

export default App;