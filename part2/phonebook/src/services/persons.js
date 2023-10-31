import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).catch((error) => {
    console.log(error);
  });
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).catch((error) => {
    console.log(error);
  });
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((respose) => respose.data)
    .catch((error) => {
      console.log(error);
    });
};

const deleteVal = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};
export default {
  getAll: getAll,
  create: create,
  update: update,
  delete: deleteVal,
};
