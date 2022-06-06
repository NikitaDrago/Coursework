import UsersList from "../AdminPanel/UsersList";

const EditCourceInfo = ({
                          lectures,
                          selectLecture,
                          onOption,
                          newTitle,
                          newWeeks,
                          newDescription,
                          isError,
                          setIsError,
                          setSelectImg,
                          selectImg
                        }) =>
  <>
    {isError && <h3 className="Modal-form__subtitle">Вы ничего не изменили</h3>}
    <input
      ref={newTitle}
      placeholder={'Название курса'}
      className={(isError ? 'input_negative ' : '') + "input CourseInfo-container__input"}
      onChange={() => isError && setIsError(false)}
    />
    <input
      ref={newWeeks}
      placeholder={`Кол-во недель обучения: `}
      className={(isError ? 'input_negative ' : '') + "input CourseInfo-container__input"}
      onChange={() => isError && setIsError(false)}
    />
    <textarea
      ref={newDescription}
      placeholder="Информация о курсе"
      className={(isError ? 'input_negative ' : '') + "input CourseInfo-container__input CourseInfo-container__textarea"}
      onChange={() => isError && setIsError(false)}
    />

    <hr className="Profile__line"/>
    <span className="CourseInfo-container-lecturer__FI" style={{marginBottom: 10}}>Выберите лектора курса</span>

    <UsersList
      users={lectures}
      onOption={onOption}
      profile={selectLecture}
      isError={isError}/>

    <hr className="Profile__line"/>
    <div className="CourseCard-container">
      {
        Array.from({length: 6}, (_, id) => {
          const img = require(`../../img/cards/${id + 1}.jpg`);

          return <div key={img}
                      className={`CourseCard__card ${selectImg === id + 1 && 'CourseCard__card_selected'}`}
                      style={{backgroundImage: `url(${img}`}}
                      onClick={() => setSelectImg(id + 1)}/>;
        })
      }
    </div>
  </>;

export default EditCourceInfo;