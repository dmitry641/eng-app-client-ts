import React from "react";
import { decksAPI } from "../../service/decksApi";

export const ModulesInit: React.FC = () => {
  useDecksInit();
  return null;
};

const useDecksInit = () => {
  decksAPI.useGetUserDecksQuery();
  decksAPI.useGetDecksQuery();
  decksAPI.useGetSettingsQuery();
  return null;
};
