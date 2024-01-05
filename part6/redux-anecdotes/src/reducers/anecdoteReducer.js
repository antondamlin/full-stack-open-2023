import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const anectdoteVoted = state.find((anec) => anec.id === id);
      const newAnecdote = {
        ...anectdoteVoted,
        votes: anectdoteVoted.votes + 1,
      };
      return state.map((anec) => (anec.id !== id ? anec : newAnecdote));
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
export default anecdoteSlice.reducer;

/*const anecdoteReducer = (state = initialState, action) => {
  .log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE":
      const id = action.payload.id;
      const anectdoteVoted = state.find((anec) => anec.id === id);
      const newAnecdote = {
        ...anectdoteVoted,
        votes: anectdoteVoted.votes + 1,
      };
      return state.map((anec) => (anec.id !== id ? anec : newAnecdote));
    case "NEW_ANECDOTE":
      return [...state, action.payload];
    default:
      return state;
  }
};

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    payload: { id },
  };
};

export const addAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    payload: {
      content,
      votes: 0,
      id: getId(),
    },
  };
}
*/
