import { useState } from "react";

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.number}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.allProp === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text={"good"} number={props.goodProp} />
          <StatisticLine text={"neutral"} number={props.neutralProp} />
          <StatisticLine text={"bad"} number={props.badProp} />
          <StatisticLine text={"all"} number={props.allProp} />
          <StatisticLine text={"average"} number={props.avgProp} />
          <StatisticLine text={"positive"} number={props.posProp} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0.0);
  const [positive, setPositive] = useState(0.0);

  const updateStats = (goodVal, neutralVal, badVal) => {
    const newAll = goodVal + neutralVal + badVal;
    const newAverage = (goodVal * 1 + neutralVal * 0 + badVal * -1) / newAll;
    const newPositive = goodVal / newAll;
    setAll(newAll);
    setAverage(newAverage);
    setPositive(newPositive);
  };
  const handleGoodClick = () => {
    const newGood = good + 1;
    updateStats(newGood, neutral, bad);
    setGood(newGood);
  };
  const handleNeutralClick = () => {
    const newNeutral = neutral + 1;
    updateStats(good, newNeutral, bad);
    setNeutral(newNeutral);
  };
  const handleBadClick = () => {
    const newBad = bad + 1;
    updateStats(good, neutral, newBad);
    setBad(newBad);
  };
  return (
    <div>
      <h2>give feedback</h2>
      <div style={{ display: "flex" }}>
        <Button text={"good"} handleClick={handleGoodClick} />
        <Button text={"neutral"} handleClick={handleNeutralClick} />
        <Button text={"bad"} handleClick={handleBadClick} />
      </div>
      <Statistics
        goodProp={good}
        neutralProp={neutral}
        badProp={bad}
        avgProp={average}
        posProp={positive}
        allProp={all}
      />
    </div>
  );
};

export default App;
