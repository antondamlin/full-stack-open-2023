import { addAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { setTimeoutNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleAdd = (event) => {
    event.preventDefault();
    const val = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(addAnecdote(val));
    const message = 'you added anecdote a new anecdote: \'' + val + '\'';
    dispatch(setTimeoutNotification(message, 5));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
