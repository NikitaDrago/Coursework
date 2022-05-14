const EditUserInfo = ({
                        changeLogin,
                        changePass,
                        changeRole,
                        profile,
                        onSaveInfo,
                        onDeleteProfile,
                        setSpinner,
                        isError,
                        setIsError
                      }) =>
  <div className="AdminPanel-userInfo">
    <input
      ref={changeLogin}
      placeholder={profile ? `Login: ${profile.login}` : 'login'}
      onChange={() => isError && setIsError(!isError)}
      className={(isError ? 'input_negative ' : '') + "input Profile-info-container__input"}/>
    <input
      ref={changePass}
      type="password"
      placeholder={profile ? `Password: ${profile.password}` : 'password'}
      className={(isError ? 'input_negative ' : '') + "input Profile-info-container__input"}
      onChange={() => isError && setIsError(!isError)}
    />

    <select ref={changeRole} className="Profile-info-container__input AdminPanel-userInfo__select">
      <option value="STUDENT">STUDENT</option>
      <option value="TEACHER">TEACHER</option>
      <option value="ADMIN">ADMIN</option>
    </select>

    <button className="button AdminPanel__button"
            disabled={isError}
            onClick={() => {
              !isError && setSpinner(true);
              onSaveInfo();

            }}
    >
      Сохранить
    </button>
    {
      profile && <button
        className="button button_negative AdminPanel__button"
        onClick={() => {
          setSpinner(true);
          onDeleteProfile();
        }}
      >
        Удалить пользователя
      </button>
    }
  </div>;

export default EditUserInfo;