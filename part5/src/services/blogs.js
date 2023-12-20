import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
let config = {};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addBlog = async (blog) => {
  const res = await axios.post(baseUrl, blog, config);
  return res.data;
};

export default { getAll, setToken, addBlog };
