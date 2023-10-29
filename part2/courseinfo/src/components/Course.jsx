const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
  let totalSum = 0;
  parts.forEach((part) => (totalSum = totalSum + part.exercises));
  return (
    <p>
      <b>total of {totalSum} exercises</b>
    </p>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

export default Course;
