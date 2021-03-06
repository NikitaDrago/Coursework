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
  const [selectImg, setSelectImg] = useState(1);

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
      hours: selectImg,
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
      {isError && <h3 className="Modal-form__subtitle">???? ???????????? ???? ????????????????</h3>}
      {isSuccess && <h3 className="Modal-form__subtitle text_success">???????? ????????????????!</h3>}
      <input
        ref={title}
        placeholder={'???????????????? ??????????'}
        className={(isError ? 'input_negative ' : '') + "input CourseInfo-container__input"}
        onChange={() => {
          isError && setIsError(false);
          isSuccess && setSuccess(false)
        }}
      />
      <input
        ref={weeks}
        placeholder={`??????-???? ???????????? ????????????????: `}
        className={(isError ? 'input_negative ' : '') + "input CourseInfo-container__input"}
        onChange={() => {
          isError && setIsError(false);
          isSuccess && setSuccess(false)
        }}
      />
      <textarea
        ref={description}
        placeholder="???????????????????? ?? ??????????"
        className={(isError ? 'input_negative ' : '') + "input CourseInfo-container__input CourseInfo-container__textarea"}
        onChange={() => {
          isError && setIsError(false);
          isSuccess && setSuccess(false)
        }}
      />

      <hr className="Profile__line"/>
      <span className="CourseInfo-container-lecturer__FI" style={{marginBottom: 10}}>???????????????? ?????????????? ??????????</span>

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

      <button style={{margin: '20px auto 0'}} className="button CourseInfo-admin__button" onClick={() => {
        setSpinner(true);
        handleSave();
      }}>??????????????????
      </button>
    </div>
  </div>;
};

export default AddCourse;
