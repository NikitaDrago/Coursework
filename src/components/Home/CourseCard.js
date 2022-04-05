const CourseCard = ({course, onCourseCard}) =>
  <div className="Home-container__item" onClick={() => onCourseCard(course)}>
    <h3>{course.title}</h3>
    <h5>Длительность: {course.weeks} недель</h5>
  </div>;

export default CourseCard;