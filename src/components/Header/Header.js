import { NavLink, useNavigate } from "react-router-dom";

const Header = ({onClickModal, admin, onAdmin}) => {
  const navigate = useNavigate()

  const handleProfile = () => {
    navigate(`/profile/${Math.round(Math.random() * 100000000)}`)
  }

  return (
    <header className="Header-wrapper">
      <NavLink
        to="/"
        className={({isActive}) => "nav-link" + (isActive ? " activated" : "")}
      >
        Главная
      </NavLink>
      {
       admin ?
         <div>
           <button className="button Header__button" onClick={handleProfile}>Профиль</button>
           <button className="button Header__button" onClick={onAdmin}>Выйти</button>
         </div>
         : <button className="button Header__button" onClick={onClickModal}>Войти</button>
      }
    </header>
  );
};

export default Header;