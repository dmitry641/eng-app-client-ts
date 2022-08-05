import React from "react";
import { cardsAPI } from "../../service/cardsApi";
import { decksAPI } from "../../service/decksApi";

export const ModulesInit: React.FC = () => {
  useDecksInit();
  useCardsInit();
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
