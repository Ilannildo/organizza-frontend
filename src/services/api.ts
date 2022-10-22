import axios from "axios";

// export const apiUrl ="https://apimonitora.herokuapp.com/api"; // http://apidev.maissaude.bybitx.com
export const apiUrl = process.env.REACT_APP_API_URL; // http://apidev.maissaude.bybitx.com
export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});
