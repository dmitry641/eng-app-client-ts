import React from "react";
import { cardsAPI } from "../../service/cardsApi";
import { decksAPI } from "../../service/decksApi";
import { quizAPI } from "../../service/quizApi";

export const ModulesInit: React.FC = () => {
  useDecksInit();
  useCardsInit();
  useQuizInit();
  return null;
};

const useDecksInit = () => {
  decksAPI.useGetUserDecksQuery();
  decksAPI.useGetDecksQuery();
  decksAPI.useGetSettingsQuery();
  return null;
};

const useCardsInit = () => {
  cardsAPI.useGetCardsQuery();
  cardsAPI.useGetFavoritesQuery();
  cardsAPI.useGetSettingsQuery();
  return null;
};

const useQuizInit = () => {
  quizAPI.useINITQuery();
  return null;
};
