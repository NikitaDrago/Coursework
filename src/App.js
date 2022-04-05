import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import './styles/style.sass';
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import AccountModal from "./components/AccountModal/AccountModal";
import { useCallback, useState } from "react";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import Profile from "./components/Profile/Profile";

const App = () => {
  const [modal, setModal] = useState(false);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  const handleClickModal = useCallback(() => setModal(!modal), [modal]);

  const handleAdmin = () => {
    setAdmin(!admin);
    navigate('/');
  };

  return (
    <>
      {modal && <AccountModal onClickModal={handleClickModal} onAdmin={handleAdmin}/>}
      <Header onClickModal={handleClickModal} admin={admin} onAdmin={handleAdmin}/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/courses/:id" element={<CourseInfo admin={admin}/>}/>
        <Route exact path="/profile/:id" element={<Profile/>}/>
      </Routes>
    </>
  );
};

export default App;
