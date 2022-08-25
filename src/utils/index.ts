import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";

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

type ApiError = { message?: string; status?: number };
export type AxiosApiError = AxiosError<ApiError>;
export type BaseQueryError = { data?: ApiError };

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function errorHandler(error: unknown) {
  const msg = errorMsgGenerator(error);
  enqueueSnackbar(msg, { variant: "error" });
}
export function errorMsgGenerator(error: unknown): string {
  let msg;
  if (axios.isAxiosError(error)) {
    const err = error as AxiosApiError;
    msg = err?.response?.data?.message;
  }

  return msg || "Error";
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
