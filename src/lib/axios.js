import axios from "axios";

const baseURL = "https://www.thecocktaildb.com/api/json/v1/1/";

const api = axios.create({
  baseURL,
});

export default api;
