const CourseCard = ({course, onCourseCard}) =>
  <div className="Home-container__item" onClick={() => onCourseCard(course)}>
    <span className="Home-container__title">{course.name}</span>
    <span className="Home-container__duration">Длительность: {course.weeks} недель</span>
  </div>;

export default CourseCard;