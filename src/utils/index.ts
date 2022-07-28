import { AxiosError } from "axios";

export enum HeaderTitleEnum {
  account = "Account",
  shop = "Shop",
  flashcards = "Flashcards",
  flashcardsSettings = "Flashcards settings",
  decks = "Decks",
  decksSettings = "Decks settings",
  quiz = "Quiz",
  quizSettings = "Quiz settings",
}

export type AxiosApiError = AxiosError<{ message?: string }>;

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function errorHandler(error: unknown) {
  console.log(error);
}
export function errorMsgGenerator(error: unknown) {
  const err = error as AxiosApiError;
  const msg = err.response?.data?.message || "Error";
  return msg;
}

export const API_URL = process.env.REACT_APP_SERVER_URL + "/api";
export const LS_KEY = "eng-app";

const multiplier = 1000;
export const TIMEOUTS = {
  xs: multiplier * 0.1,
  short: multiplier * 0.5,
  medium: multiplier,
  long: multiplier * 1.5,
  xl: multiplier * 2,
};
