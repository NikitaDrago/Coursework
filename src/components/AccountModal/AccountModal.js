const AccountModal = ({onClickModal, onAdmin}) => {
  return (
    <div className="Modal">
      <div className="Modal-window">
        <button className="Modal__close" onClick={onClickModal}>×</button>
        <div className="Modal-form">
          <h2 className="Modal-form__title">Авторизация</h2>
          <input type="text" placeholder="Логин" className="input Modal-form__input"/>
          <input type="password" placeholder="Пароль" className="input Modal-form__input"/>
          <button className="button Modal-form__button" onClick={() => {
            onClickModal();
            onAdmin();
          }}>Вход
          </button>
        </div>
      </div>
      <div className="Modal-overlay" onClick={onClickModal}/>
    </div>
  );
};

export default AccountModal;