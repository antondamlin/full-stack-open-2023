import axios from "axios";

const getId = () => (100000 * Math.random()).toFixed(0);

export const getAll = () =>
  axios.get("http://localhost:3001/anecdotes").then((res) => res.data);

export const createAnecdote = (anecContent) => {
  const anecObject = {
    content: anecContent,
    votes: 0,
    id: getId(),
  };
  axios
    .post("http://localhost:3001/anecdotes", anecObject)
    .then((res) => res.data);
};
