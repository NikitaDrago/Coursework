
const CourseCard = ({course, onCourseCard}) => {
  const img = require(`../../img/cards/${course.hours > 6 ? 1 : course.hours}.jpg`)

  return <div className="Home-container__item" style={{backgroundImage: `url(${img}`}} onClick={() => onCourseCard(course)}>
    <span className="Home-container__title">{course.name}</span>
    <span className="Home-container__duration">{course.weeks} недель</span>
  </div>;
};

export default CourseCard;