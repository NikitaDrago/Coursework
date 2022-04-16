const UserInfo = ({profile, newInfo, onChangeInfo, onSaveInfo, onDeleteProfile, setSpinner}) => {
  return <div className="AdminPanel-userInfo">
    {
      profile && <input placeholder={`id: ${profile.id}`} className="input Profile-info-container__input"
             onChange={onChangeInfo}
      />
    }
    <input placeholder={profile ? `Login: ${profile.login}` : 'login'} className="input Profile-info-container__input"
           onChange={onChangeInfo}/>
    <input type="password" placeholder={profile ? `Password: ${profile.password}` : 'password'} className="input Profile-info-container__input"
           onChange={onChangeInfo}/>
    <select className="Profile-info-container__input" style={{maxWidth: '360px'}}
            onChange={onChangeInfo}
            value={newInfo && newInfo?.role ? newInfo.role : (profile?.role || "STUDENT")}
    >
      <option value="STUDENT">STUDENT</option>
      <option value="TEACHER">TEACHER</option>
      <option value="ADMIN">ADMIN</option>
    </select>
    <button className="button AdminPanel__button" onClick={() => {
      onSaveInfo();
      setSpinner(true);
    }}>
      Сохранить
    </button>
    {
      profile && <button className="button button_negative AdminPanel__button" onClick={() => {
        onDeleteProfile();
        setSpinner(true);
      }}>
        Удалить
      </button>
    }
  </div>;
};

export default UserInfo;