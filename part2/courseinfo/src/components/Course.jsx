const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
  const totalSum = parts
    .map((part) => part.exercises)
    .reduce((s, p) => {
      return s + p;
    });
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
    {parts.map((part, i) => (
      <Part key={i} part={part} />
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
