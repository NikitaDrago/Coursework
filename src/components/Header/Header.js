import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { idSelector, isAuthSelector, roleSelector } from "../../store/selectors";
import { useCallback } from "react";

const Header = ({onClickModal, onLogout}) => {
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthSelector);
  const role = useSelector(roleSelector);

  const handleProfile = useCallback(() => {
    navigate(`/profile`);
  }, [navigate]);

  const handleEditProfiles = useCallback(() => {
    navigate('/profileeditor');
  }, [navigate]);

  return (
    <header className="Header-wrapper">
      <NavLink
        to="/"
        className={({isActive}) => "nav-link" + (isActive ? " activated" : "")}
      >
        Главная
      </NavLink>
      {
        isAuth ?
          <div>
            {
              role === 'ADMIN' &&
              <button className="button Header__button" onClick={handleEditProfiles}>Пользователи</button>
            }
            <button className="button Header__button" onClick={handleProfile}>Профиль</button>
            <button className="button Header__button" onClick={onLogout}>Выйти</button>
          </div>
          : <button className="button Header__button" onClick={onClickModal}>Войти</button>
      }
    </header>
  );
};

export default Header;