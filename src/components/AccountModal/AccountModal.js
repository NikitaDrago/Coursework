import { useCallback, useState } from "react";

const AccountModal = ({onClickModal, onLogin, setSpinner}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleClick = useCallback(() => {
    console.log('click');
    setSpinner(true);
    onClickModal();
    onLogin(email, pass);
  }, [email, onClickModal, onLogin, pass, setSpinner]);

  return (
    <div className="Modal">
      <div className="Modal-window"
      >
        <button className="Modal__close" onClick={onClickModal}>×</button>
        <div className="Modal-form">
          <h2 className="Modal-form__title">Авторизация</h2>

          <input type="text" placeholder="Логин" className="input Modal-form__input"
                 onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Пароль" className="input Modal-form__input"
                 onChange={(e) => setPass(e.target.value)}
                 onKeyPress={(e) => e.key === 'Enter' && handleClick()}
          />
          <button className="button Modal-form__button" onClick={handleClick}>
            Войти
          </button>
        </div>
      </div>
      <div className="Modal-overlay" onClick={onClickModal}/>
    </div>
  );
};

export default AccountModal;