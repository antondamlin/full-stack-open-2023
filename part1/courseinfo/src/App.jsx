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

const Part = (props) => {
  return (
    <div>
      <p>
        {props.partName} {props.exsNum}
      </p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part partName={props.partOne.name} exsNum={props.partOne.exercises} />
      <Part partName={props.partTwo.name} exsNum={props.partTwo.exercises} />
      <Part
        partName={props.partThree.name}
        exsNum={props.partThree.exercises}
      />
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header courseName={course} />
      <Content partOne={part1} partTwo={part2} partThree={part3} />
      <Total totalExs={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
