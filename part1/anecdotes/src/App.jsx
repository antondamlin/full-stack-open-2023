import { useState } from "react";

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [votesIdx, setVotesIdx] = useState(0);

  const handleRandomClick = () => {
    const randomSelection = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomSelection);
  };

  const handleVoteClick = () => {
    const copyArray = [...points];
    copyArray[selected] += 1;
    let mostVotes = votesIdx;
    for (var i = 0; i < copyArray.length; i++) {
      if (copyArray[i] > copyArray[mostVotes]) {
        mostVotes = i;
      }
    }
    setVotesIdx(mostVotes);
    setPoints(copyArray);
  };
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <div style={{ display: "flex" }}>
        <button onClick={handleVoteClick}>vote</button>
        <button onClick={handleRandomClick}>next anecdote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[votesIdx]}</p>
    </div>
  );
}

export default App;
