import { useSelector } from "react-redux";
import { infoSelector, loginSelector, passwordSelector, roleSelector } from "../../store/selectors";

const ProfileEdit = ({
                       isError,
                       setIsError,
                       newLogin,
                       newPass,
                       newName,
                       newSurname,
                       newPhone,
                       newEmail,
                       newAgeOrEducation
                     }) => {
  const role = useSelector(roleSelector);
  const login = useSelector(loginSelector);
  const pass = useSelector(passwordSelector);
  const info = useSelector(infoSelector);

  return (
    <>
      {
        info && <>
          <span style={{width: '100%', textAlign: 'center'}}>
            <input ref={newName} placeholder={info.name}
                   style={{marginRight: 20}}
                   className={(isError ? 'input_negative ' : '') + "input Profile-info-container__input"}
                   onChange={(e) => isError && setIsError(!isError)}/>
          <input ref={newSurname} placeholder={info.surname}
                 className={(isError ? 'input_negative ' : '') + "input Profile-info-container__input"}
                 onChange={(e) => isError && setIsError(!isError)}/>
          </span>
          <hr className="Profile__line"/>
          <input ref={newAgeOrEducation} placeholder={
            info.account.role === 'TEACHER' ? ('Образование: ' + info.education.toLowerCase())
              : 'Возраст: ' + info.age
          }
                 className={(isError ? 'input_negative ' : '') + "input Profile-info-container__input"}
                 onChange={(e) => isError && setIsError(!isError)}/>
          <input ref={newPhone} placeholder={`Телефон: ${info.phone}`}
                 className={(isError ? 'input_negative ' : '') + "input Profile-info-container__input"}
                 onChange={(e) => isError && setIsError(!isError)}/>
          <input ref={newEmail} placeholder={`Почта: ${info.email}`}
                 className={(isError ? 'input_negative ' : '') + "input Profile-info-container__input"}
                 onChange={(e) => isError && setIsError(!isError)}/>
          <hr className="Profile__line"/>
        </>
      }
      <input ref={newLogin} placeholder={`Логин: ${login || info.account?.login}`}
             className={(isError ? 'input_negative ' : '') + "input Profile-info-container__input"}
             onChange={(e) => isError && setIsError(!isError)}/>
      <input ref={newPass} placeholder={`Пароль: ${pass || info.account?.password}`}
             className={(isError ? 'input_negative ' : '') + "input Profile-info-container__input"}
             onChange={(e) => isError && setIsError(!isError)}/>
    </>
  );
};

export default ProfileEdit;