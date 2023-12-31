import { voteAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector((data) => {
    if (data.filter === "") {
      return data.anecdotes;
    } else {
      return data.anecdotes.filter((anec) =>
        anec.content.toLowerCase().includes(data.filter)
      );
    }
  });

  const dispatch = useDispatch();
  const sortByVotes = (a, b) => b.votes - a.votes;

  const handleVote = (id) => {
    console.log("vote", id);
    dispatch(voteAnecdote(id));
  };

  return (
    <div>
      {anecdotes.sort(sortByVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
