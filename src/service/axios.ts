import axios from "axios";
import { appResetAll } from "../redux/actions/app-actions";
import { store } from "../redux/store";
import { API_URL } from "../utils";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response.status === 401 && error.config) {
      store.dispatch(appResetAll());
    }
    throw error;
  }
);

export default $api;
