const Header = (props) => {
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.totalExs}</p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <p>
        {props.partOne} {props.exs1}
      </p>
      <p>
        {props.partTwo} {props.exs2}
      </p>
      <p>
        {props.partThree} {props.exs3}
      </p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header courseName={course} />
      <Content
        partOne={part1}
        partTwo={part2}
        partThree={part3}
        exs1={exercises1}
        exs2={exercises2}
        exs3={exercises3}
      />
      <Total totalExs={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
