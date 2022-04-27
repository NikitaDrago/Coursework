import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import './styles/style.sass';
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import AccountModal from "./components/AccountModal/AccountModal";
import { useCallback, useState } from "react";
import Profile from "./components/Profile/Profile";
import { authLogin, clearProfile, setNewData } from "./store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { idSelector, isAuthSelector, roleSelector } from "./store/selectors";
import ProfilesEditor from "./components/AdminPanel/ProfilesEditor";
import { postNewProfileData } from "./store/userSlice";
import { getUsers } from "./store/adminSlice";
import Spinner from "./components/Spinner";
import EditCourceInfo from "./components/Course/EditCourceInfo";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Course from "./components/Course/Course";

const App = () => {
  const id = useSelector(idSelector);
  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector(roleSelector);
  // const courses = useSelector(coursesListSelector);

  const handleClickModal = useCallback(() => setModal(!modal), [modal]);

  const handleLogout = useCallback(() => {
    dispatch(clearProfile());
    navigate('/');
  }, [dispatch, navigate]);

  const handleLogin = useCallback(async (login, password, closeModal) => {
    await dispatch(authLogin({login, password})).then(res => res.meta.requestStatus === "fulfilled" && closeModal());
    setSpinner(false);
  }, [dispatch]);

  const saveNewInfo = useCallback(async (data, type) => {
    let url = 'users';

    if (type === 'TEACHER') {
      url = 'lecturers';
    } else if (type === 'STUDENT') {
      url = 'students';
    }
    try {
      await dispatch(postNewProfileData({data, url}));

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
      console.log(e)
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
          isAuth && (role === 'ADMIN' || role === 'TEACHER') && <Route path="/courses" element={<EditCourceInfo/>}/>
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

//[{"id":1,"lecturer":{"account":{"id":3,"login":"teacher1","password":"password","role":"TEACHER"},"name":"Мария","surname":"Юдина","phone":"375(25)707-01-26","email":"gonnucropraume-5739@gmail.com","education":"ASSISTANT","courses":null},"name":"Data Engineering","description":"На тренинге ты научишься трансформировать данные в качественную информацию, которая приносит пользу бизнесу.","weeks":10,"hours":3,"distributions":null},{"id":2,"lecturer":{"account":{"id":4,"login":"teacher2","password":"password","role":"TEACHER"},"name":"Дарья","surname":"Ермакова","phone":"375(33)306-36-32","email":"wicussaugoitti-4624@yandex.com","education":"SENIOR_LECTURER","courses":null},"name":"Java Web Development","description":"Задача курса — на примере небольшого проекта познакомиться с основными методами и технологиями.","weeks":10,"hours":6,"distributions":null},{"id":3,"lecturer":{"account":{"id":5,"login":"teacher3","password":"password","role":"TEACHER"},"name":"Деитд","surname":"Русанов","phone":"375(29)508-08-44","email":"cadefripaujo-6588@mail.com","education":"DOCENT","courses":null},"name":"Cloud and DevOps","description":"На нашем тренинге мы научим тебя применять методологии DevOps и поможем прокачаться в Cloud-технологиях.","weeks":18,"hours":6,"distributions":null},{"id":4,"lecturer":{"account":{"id":6,"login":"teacher4","password":"password","role":"TEACHER"},"name":"Ева","surname":"Попова","phone":"375(29)431-11-75","email":"canewalleuppe-6591@mail.com","education":"DOCENT","courses":null},"name":"Modern SAP Development","description":"Программа включает изучение современных технологий разработки ПО в средах SAP ECC и SAP Cloud Platform.","weeks":20,"hours":3,"distributions":null},{"id":5,"lecturer":{"account":{"id":7,"login":"teacher5","password":"password","role":"TEACHER"},"name":"Денис","surname":"Дроздов","phone":"375(33)500-93-45","email":"daboucehutte-5902@yandex.com","education":"PROFESSOR","courses":null},"name":"Performance Optimization","description":"На тренинге вы научитесь основам тестирования и анализа производительности компьютерных систем.","weeks":5,"hours":5,"distributions":null}]
