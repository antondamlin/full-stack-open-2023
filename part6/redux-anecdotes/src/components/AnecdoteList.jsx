import { voteAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setTimeoutNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((data) => {
    const dataObj = JSON.parse(JSON.stringify(data));
    if (dataObj.filter === '') {
      return dataObj.anecdotes;
    } else {
      const returnArray = dataObj.anecdotes.filter((anec) => {
        return anec.content.toLowerCase().includes(dataObj.filter);
      });
      return returnArray;
    }
  });
  const dispatch = useDispatch();
  const sortByVotes = (a, b) => b.votes - a.votes;

  const handleVote = (id, title) => {
    console.log('vote', id);
    dispatch(voteAnecdote(id));
    const message = 'you voted \'' + title + '\'';
    dispatch(setTimeoutNotification(message, 5));
  };

  return (
    <div>
      {anecdotes.sort(sortByVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
