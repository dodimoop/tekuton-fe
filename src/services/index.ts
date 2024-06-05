import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_API;

// SETUP AXIOS
const AXIOS = axios.create({
  baseURL: BASE_URL,
});

export default AXIOS;
