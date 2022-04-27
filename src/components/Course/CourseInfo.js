const CourseInfo = ({course}) =>
  course && <>
    <h1 className="CourseInfo-container__title">
      {course.name}
    </h1>
    <h5 className="CourseInfo-container__subtitle">
      Кол-во недель обучения: {course.weeks}
    </h5>
    <p className="CourseInfo-container__description">
      {course.description}
    </p>
    <div className="CourseInfo-container-lecturer">
      <hr className="Profile__line"/>
      <span
        className="CourseInfo-container-lecturer__FI">{course.lecturer.name} {course.lecturer.surname}</span>
      <span className="CourseInfo-container-lecturer__education">{course.lecturer.education}</span>
      <span className="CourseInfo-container-lecturer__phone">{course.lecturer.phone}</span>
      <span className="CourseInfo-container-lecturer__email">{course.lecturer.email}</span>
    </div>
  </>;

export default CourseInfo;