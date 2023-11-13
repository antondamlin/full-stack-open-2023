import axios from "axios";
const api_key = import.meta.env.VITE_API_KEY
const baseUrlCountry = "https://studies.cs.helsinki.fi/restcountries/api/";

//http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London
const getAll = () => {
  return axios.get(baseUrlCountry + "all");
};

const getWeatherData = (capital) => {
  return axios.get("http://api.weatherapi.com/v1/current.json?key=" + api_key + "&q=" + capital);
};

export default {
  getAll: getAll,
  getWeatherData: getWeatherData,
};
