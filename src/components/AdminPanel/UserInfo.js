const UserInfo = ({profile, onChangeInfo, onSaveInfo}) => {
  return <div className="AdminPanel-userInfo">
    <input placeholder={`id: ${profile.id}`} className="input Profile-info-container__input"
           onChange={onChangeInfo}
    />
    <input placeholder={`Login: ${profile.login}`} className="input Profile-info-container__input"
           onChange={onChangeInfo}/>
    <input placeholder={`Password: ${profile.password}`} className="input Profile-info-container__input"
           onChange={onChangeInfo}/>
    <input placeholder={`Role: ${profile.role}`} className="input Profile-info-container__input"
           onChange={onChangeInfo}/>
    <button className="button CourseInfo-admin__button" onClick={onSaveInfo}>
      Сохранить
    </button>
  </div>;
};

export default UserInfo;