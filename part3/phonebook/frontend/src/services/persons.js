import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (personObject) => {
  return axios.post(baseUrl, personObject);
};

const update = (id, personObject) => {
  return axios.put(`${baseUrl}/${id}`, personObject);
};

const deleteVal = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};
export default {
  getAll: getAll,
  create: create,
  update: update,
  remove: deleteVal,
};