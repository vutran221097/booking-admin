import axios from "axios";
import { store } from '../store'
import { logOut } from "../reducer/authReducer";

const Axios = axios.create({
  // Configuration
  baseURL: "http://localhost:5000"
});

//validate response
Axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    store.dispatch(logOut());
    return window.location.href = '/'
  }
  return Promise.reject(error);
});

export default Axios;
