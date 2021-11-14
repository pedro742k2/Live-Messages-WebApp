import axios from "axios";

export const serverUrl = "https://nlw-server-nodejs.herokuapp.com";

export const api = axios.create({
  baseURL: serverUrl,
});
