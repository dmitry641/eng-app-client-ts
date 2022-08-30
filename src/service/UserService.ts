import axios from "axios";

import {
  ISession,
  IStatistic,
  IUserSettings,
  SignInInput,
  SignUpInput,
  UpdUserSettingsType,
  UserResponseType,
} from "../models/user";
import { API_URL } from "../utils";
import $api from "./axios";

export class UserService {
  static getUser() {
    return $api.get<UserResponseType>("/users/");
  }
  static signIn(signInInput: SignInInput) {
    return axios.post<UserResponseType>(
      `${API_URL}/users/signin`,
      signInInput,
      {
        withCredentials: true,
      }
    );
  }
  static signUp(signUpInput: SignUpInput) {
    return axios.post<UserResponseType>(
      `${API_URL}/users/signup`,
      signUpInput,
      {
        withCredentials: true,
      }
    );
  }
  static logout() {
    return $api.delete("/users/logout");
  }
  static getSessions() {
    return $api.get<ISession[]>("/users/sessions/");
  }
  static resetSessions() {
    return $api.delete("/users/sessions/");
  }
  static updateSettings(obj: UpdUserSettingsType) {
    return axios.post<IUserSettings>(`${API_URL}/users/settings`, obj, {
      withCredentials: true,
    });
  }
  static getStatistics() {
    return $api.get<IStatistic[]>("/users/statistics/");
  }
}
