const ProfileInfo = ({info, role, login, pass}) => <>
  {
    info && <>
      <h2 className="Profile-info-container__title">{`${info.name} ${info.surname}`}</h2>
      <hr className="Profile__line"/>
      <span
        className="Profile-info-container__item">
                        {
                          info.account.role === 'TEACHER' ?
                            <span>Образование: <i>{info.education.toLowerCase()}</i></span>
                            : <span>Возраст: <i>{info.age}</i></span>
                        }
                      </span>
      <span className="Profile-info-container__item">Номер телефона: <i>{info.phone}</i></span>
      <span className="Profile-info-container__item">Почта: <i>{info.email}</i></span>
      <hr className="Profile__line"/>
    </>
  }
  <span className="Profile-info-container__item">Логин: <i>{login || info.account?.login}</i></span>
  <span className="Profile-info-container__item">Пароль: <i>{pass || info.account?.password}</i></span>
  <span
    className="Profile-info-container__item">Роль: <i>{(role || info.account?.role).toLowerCase()}</i>
                  </span>
</>;

export default ProfileInfo;