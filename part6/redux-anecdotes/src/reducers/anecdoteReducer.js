import { createSlice } from '@reduxjs/toolkit';
import anecdoteServices from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const anecdote = action.payload;
      return state.map((anec) => (anec.id !== anecdote.id ? anec : anecdote));
    },
    addAnecdote(state, action) {
      state.push(action.payload);
      return state;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteServices.createNew(content);
    dispatch(appendAnecdote(anecdote));
  };
};

export const addVoteToAnecdote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteServices.addVote(id);
    dispatch(voteAnecdote(anecdote));
  };
};

export default anecdoteSlice.reducer;