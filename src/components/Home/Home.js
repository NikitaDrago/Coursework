import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";

export const COURSES = [
  {
    title: 'Data Engineering',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus assumenda aut eius, error ex fugit iure laboriosam, maxime minus neque non nulla odit perspiciatis qui recusandae, suscipit tenetur voluptate voluptatibus.',
    weeks: 3,
    hours: 10,
  },
  {
    title: 'Java Web Development',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus assumenda aut eius, error ex fugit iure laboriosam, maxime minus neque non nulla odit perspiciatis qui recusandae, suscipit tenetur voluptate voluptatibus.',
    weeks: 6,
    hours: 10,
  },
  {
    title: 'Cloud and DevOps',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus assumenda aut eius, error ex fugit iure laboriosam, maxime minus neque non nulla odit perspiciatis qui recusandae, suscipit tenetur voluptate voluptatibus.',
    weeks: 6,
    hours: 18,
  },
  {
    title: 'Modern SAP Development',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus assumenda aut eius, error ex fugit iure laboriosam, maxime minus neque non nulla odit perspiciatis qui recusandae, suscipit tenetur voluptate voluptatibus.',
    weeks: 3,
    hours: 20,
  },
  {
    title: 'Performance Optimization',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus assumenda aut eius, error ex fugit iure laboriosam, maxime minus neque non nulla odit perspiciatis qui recusandae, suscipit tenetur voluptate voluptatibus.',
    weeks: 5,
    hours: 5,
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleCourseCard = (course) => {
    navigate(`/courses/${course.title.split(' ').join('')}`)
  };

  return (
    <div className="wrapper">
      <h2 className="Home-wrapper__title">Доступные курсы</h2>
      <div className="Home-container">
        {
          COURSES.map(course => <CourseCard
            key={`${course.title}_${Date.now()}`}
            course={course}
            onCourseCard={handleCourseCard}
          />)
        }
      </div>
    </div>
  );
};

export default Home;