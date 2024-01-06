import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (anecContent) => {
  const anecObject = {
    content: anecContent,
    votes: 0,
    id: getId(),
  };
  const resp = await axios.post(baseUrl, anecObject);
  return resp.data;
};

const addVote = async (id) => {
  const anecdoteVal = await axios.get(`${baseUrl}/${id}`);
  const newVal = { ...anecdoteVal.data, votes: anecdoteVal.data.votes + 1 };
  const resp = await axios.put(`${baseUrl}/${id}`, newVal);
  return resp.data;
};

export default {
  getAll,
  createNew,
  addVote,
};
