import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { courseSelector, infoSelector, roleSelector } from "../../store/selectors";
import { useEffect, useRef, useState } from "react";
import { deleteCourse, getCourseById, putCourse } from "../../store/coursesSlice";
import Spinner from "../Spinner";
import EditCourceInfo from "./EditCourceInfo";
import CourseInfo from "./CourseInfo";
import { deleteUserCourse, getUserCourses, postUserCourse } from "../../fetches/distributions";

const Course = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const role = useSelector(roleSelector);
  const dispatch = useDispatch();
  const course = useSelector(courseSelector);
  const [isEdit, setIsEdit] = useState(false);
  const [selectLecture, setSelectLecture] = useState(null);
  const [lectures, setLectures] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [isError, setIsError] = useState(false);
  const info = useSelector(infoSelector);
  const [userCourse, setUserCourse] = useState();

  const newTitle = useRef();
  const newWeeks = useRef();
  const newDescription = useRef();

  const handleOption = (e) => {
    if (+e.target.value === -1) {
      setSelectLecture(null);
    } else {
      setSelectLecture(lectures.find(item => item.id === +e.target.value));
    }

    if (course.lecturer.account.id === +e.target.value || +e.target.value === -1) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const fetchLectures = () => {
    fetch('http://localhost:8080/api/lecturers')
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
  };

  const handleSave = () => {
    if (!selectLecture && !newTitle.current.value && !newWeeks.current.value && !newDescription.current.value) {
      setSpinner(false);
      setIsError(true);
      return;
    }

    const data = {
      id: Number(id),
      lecturer: {
        account: {
          id: Number(selectLecture?.id || course.lecturer.account.id)
        }
      },
      name: newTitle.current.value || course.name,
      description: newDescription.current.value || course.description,
      weeks: newWeeks.current.value || course.weeks,
      hours: course.hours,
    };

    dispatch(putCourse(data))
      .then((res) => {
        dispatch(getCourseById(id));
        setIsEdit(!isEdit);
        setSelectLecture(null);
        setSpinner(false);

      });
  };

  const handleDeleteCourse = () => {
    dispatch(deleteCourse(id))
      .then(() => {
        navigate('/');
        setSpinner(false);
      });
  };

  const handleEnrol = () => {
    if (!userCourse) {
      const data = {
        student: {
          account: {
            id: info.account.id
          }
        },
        course: {
          id: Number(id),
          lecturer: {
            account: {
              id: course.lecturer.account.id
            }
          }
        }
      };
      postUserCourse(data);
    } else {
      deleteUserCourse(userCourse.id);
    }

    navigate('/');
  };

  useEffect(() => {
    fetchLectures();
    if (info && info.account.role === 'STUDENT') {
      getUserCourses(info.account.id).then(res => setUserCourse(res[0]));
    }
  }, []);

  useEffect(() => {
    dispatch(getCourseById(id));
  }, [dispatch, id]);

  return (
    course && lectures ?
      <div className="wrapper">
        <div className="CourseInfo-container">

          {
            isEdit ?
              <EditCourceInfo
                lectures={lectures}
                selectLecture={selectLecture}
                role={role}
                course={course}
                onOption={handleOption}
                newDescription={newDescription}
                newTitle={newTitle}
                newWeeks={newWeeks}
                isError={isError}
                setIsError={setIsError}
              />
              : <CourseInfo course={course}/>
          }
          {
            (role === 'ADMIN' || info && info.account.role === 'TEACHER') &&
            <div className="CourseInfo-admin">
              {
                isEdit ? <button className="button CourseInfo-admin__button" onClick={() => {
                    setSpinner(true);
                    handleSave();
                  }}>Сохранить</button>
                  : <button className="button CourseInfo-admin__button" onClick={() => setIsEdit(!isEdit)}>
                    Редактировать курс</button>
              }
              {spinner && <Spinner/>}
              {isEdit && <button className="button CourseInfo-admin__button" onClick={() => {
                setIsError(false);
                setIsEdit(!isEdit);
              }}
              >Отменить</button>}
              <button className="button button_negative CourseInfo-admin__button"
                      onClick={() => {
                        setSpinner(true);
                        handleDeleteCourse();
                      }
                      }>Удалить
              </button>
            </div>
          }
          {
            info && info.account.role === 'STUDENT' &&
            <div className="CourseInfo-admin">
              <button
                className="button CourseInfo-admin__button"
                onClick={handleEnrol}
              >
                {userCourse && userCourse.course.id === Number(id) ? 'Уйти с курса' : 'Записаться на курс'}
              </button>
            </div>
          }
        </div>
      </div> : <Spinner/>
  );
};

export default Course;