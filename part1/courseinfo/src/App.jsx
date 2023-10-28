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
      <p>
        Number of exercises{" "}
        {props.partsArray[0].exercises +
          props.partsArray[1].exercises +
          props.partsArray[2].exercises}
      </p>
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
      <Part
        partName={props.partsArray[0].name}
        exsNum={props.partsArray[0].exercises}
      />
      <Part
        partName={props.partsArray[1].name}
        exsNum={props.partsArray[1].exercises}
      />
      <Part
        partName={props.partsArray[2].name}
        exsNum={props.partsArray[2].exercises}
      />
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header courseName={course.name} />
      <Content partsArray={course.parts} />
      <Total partsArray={course.parts} />
    </div>
  );
};

export default App;
