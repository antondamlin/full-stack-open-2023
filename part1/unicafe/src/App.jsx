import { useState } from "react";

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
      <p>good {props.goodProp}</p>
      <p>neutral {props.neutralProp}</p>
      <p>bad {props.badProp}</p>
      <p>all {props.allProp}</p>
      <p>average {props.avgProp}</p>
      <p>positive {props.posProp}</p>
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
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
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
