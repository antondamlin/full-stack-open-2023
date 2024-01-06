import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { setTimeoutNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleAdd = async (event) => {
    event.preventDefault();
    const val = event.target.anecdote.value;
    dispatch(createAnecdote(val));
    event.target.anecdote.value = '';
    const message = `you added anecdote a new anecdote: '${val}'`;
    dispatch(setTimeoutNotification(message, 10));
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
