import UsersList from "../AdminPanel/UsersList";
import { useEffect, useRef, useState } from "react";
import Spinner from "../Spinner";
import { postCourse } from "../../store/coursesSlice";
import { useDispatch } from "react-redux";

const AddCourse = () => {
  const dispatch = useDispatch();
  const [lectures, setLectures] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [selectLecture, setSelectLecture] = useState(null);

  const title = useRef();
  const weeks = useRef();
  const description = useRef();

  const handleOption = (e) => {
    if (+e.target.value === -1) {
      setSelectLecture(null);
    } else {
      setSelectLecture(lectures.find(item => item.id === +e.target.value));
    }

    if (Number(e.target.value) === -1) {
      setIsError(true);
    } else {
      setIsError(false);
      setSuccess(false)
    }
  };

  const fetchLectures = async () => {
    await fetch('http://localhost:8080/api/lecturers')
      .then(res => res.json())
      .then(res => setLectures(
          res.map((item) => {
              return {
                login: `${item.account.login} - ${item.name} ${item.surname}`,
                id: item.account.id
              };
            }
          )
        )
      );
    setSpinner(false);
  };

  const handleSave = () => {
    const postWeeks = Number(weeks.current?.value);

    const data = {
      lecturer: {
        account: {
          id: Number(selectLecture?.id)
        }
      },
      name: title.current?.value,
      description: description.current?.value,
      weeks: postWeeks > 0 && postWeeks < 20 ? Number(weeks.current?.value) : 1,
      hours: Math.floor(Math.random() * 10 + 1),
      distributions: null
    };

    dispatch(postCourse(data))
      .then(() => {
        setSpinner(false);
        setSuccess(true);
      });
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return <div className="wrapper">
    {spinner && <Spinner/>}
    <div className="CourseInfo-container">
      {isError && <h3 className="Modal-form__subtitle">Вы ничего не изменили</h3>}
      {isSuccess && <h3 className="Modal-form__subtitle text_success">Курс добавлен!</h3>}
      <input
        ref={title}
        placeholder={'Название курса'}
        className={(isError ? 'input_negative ' : '') + "input CourseInfo-container__input"}
        onChange={() => {
          isError && setIsError(false);
          isSuccess && setSuccess(false)
        }}
      />
      <input
        ref={weeks}
        placeholder={`Кол-во недель обучения: `}
        className={(isError ? 'input_negative ' : '') + "input CourseInfo-container__input"}
        onChange={() => {
          isError && setIsError(false);
          isSuccess && setSuccess(false)
        }}
      />
      <textarea
        ref={description}
        placeholder="Информация о курсе"
        className={(isError ? 'input_negative ' : '') + "input CourseInfo-container__input CourseInfo-container__textarea"}
        onChange={() => {
          isError && setIsError(false);
          isSuccess && setSuccess(false)
        }}
      />

      <hr className="Profile__line"/>
      <span className="CourseInfo-container-lecturer__FI" style={{marginBottom: 10}}>Выберите лектора курса</span>

      {
        lectures
          ? <UsersList
            users={lectures}
            onOption={handleOption}
            profile={selectLecture}
            isError={isError}
          />
          : <Spinner/>
      }

      <button style={{margin: '20px auto 0'}} className="button CourseInfo-admin__button" onClick={() => {
        setSpinner(true);
        handleSave();
      }}>Сохранить
      </button>
    </div>
  </div>;
};

export default AddCourse;
