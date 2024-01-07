import axios from "axios";

export const getAll = () =>
  axios.get("http://localhost:3001/anecdotes").then((res) => res.data);

export const createAnecdote = (anecObject) => {
  axios
    .post("http://localhost:3001/anecdotes", anecObject)
    .then((res) => res.data);
};
