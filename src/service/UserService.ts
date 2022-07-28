import axios from "axios";
import { ISession } from "../models/session";
import { SignInInput, SignUpInput, UserResponseType } from "../models/user";
import { API_URL } from "../utils";
import $api from "./axios";

function getUser() {
  return $api.get<UserResponseType>("/users/");
}

function signIn(signInInput: SignInInput) {
  return axios.post<UserResponseType>(`${API_URL}/users/signin`, signInInput, {
    withCredentials: true,
  });
}

function signUp(signUpInput: SignUpInput) {
  return axios.post<UserResponseType>(`${API_URL}/users/signup`, signUpInput, {
    withCredentials: true,
  });
}

function logout() {
  return $api.delete("/users/logout");
}

function getSessions() {
  return $api.get<ISession[]>("/users/sessions/");
}

function resetSessions() {
  return $api.delete("/users/sessions/");
}

export const userService = {
  getUser,
  signIn,
  signUp,
  logout,
  getSessions,
  resetSessions,
};
