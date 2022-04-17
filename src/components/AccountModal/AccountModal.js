import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { hasErrorSelector } from "../../store/selectors";

const AccountModal = ({onClickModal, onLogin, setSpinner}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isError, setIsError] = useState(false);
  const status = useSelector(hasErrorSelector);

  const handleClick = useCallback(() => {
    if (email && pass) {
      setSpinner(true);
      onLogin(email, pass, onClickModal);
    } else {
      setIsError(!isError);
    }
  }, [email, isError, onClickModal, onLogin, pass, setSpinner]);

  return (
    <div className="Modal">
      <div className="Modal-window"
      >
        <button className="Modal__close" onClick={onClickModal}>×</button>
        <div className="Modal-form">
          <h2 className="Modal-form__title">Авторизация</h2>
          {isError && <h3 className="Modal-form__subtitle">Требуется заполнить все поля!</h3>}
          {status && <h3 className="Modal-form__subtitle">Неверный логин или пароль</h3>}
          <input type="text" placeholder="Логин"
                 className={(isError || status ? 'input_negative ' : '') + "input Modal-form__input"}
                 onChange={(e) => {
                   setEmail(e.target.value);
                   (isError || status) && setIsError(false);
                 }}/>
          <input type="password" placeholder="Пароль"
                 className={(isError || status ? 'input_negative ' : '') + "input Modal-form__input"}
                 onChange={(e) => {
                   setPass(e.target.value);
                   (isError || status) && setIsError(false);
                 }}
          />
          <button disabled={isError} className={
            (isError ? 'button_negative ' : '') + "button Modal-form__button"
          }
                  onClick={handleClick}>
            Войти
          </button>
        </div>
      </div>
      <div className="Modal-overlay" onClick={onClickModal}/>
    </div>
  );
};

export default AccountModal;