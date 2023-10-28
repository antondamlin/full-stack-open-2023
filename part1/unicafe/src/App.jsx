import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0.0);
  const [positive, setPositive] = useState(0.0);

  const updateStats = (good, neutral, bad) => {
    const newAll = good + neutral + bad;
    const newAverage = (good * 1 + neutral * 0 + bad * -1) / newAll;
    const newPositive = good / newAll;
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
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}</p>
    </div>
  );
};

export default App;
