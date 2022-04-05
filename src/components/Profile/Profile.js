import img from '../../img/profile_img.png';

const Profile = () => {
  return (
    <div className="wrapper">
      <div className="Profile-container">
        <img src={img} alt="" className="Profile-container__photo"/>
        <div className="Profile-info-wrapper">
          <div className="Profile-info-container">
            <h2 className="Profile-info-container__FIO">Фамилия Имя Отчество</h2>
            <hr className="Profile__line"/>
            <span className="Profile-info-container__item">Логин: admin</span>
            <span className="Profile-info-container__item">Пароль: admin</span>
          </div>
          <button className="button CourseInfo-admin__button Profile__button">Редактировать Профиль</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;