import { Typography } from "@mui/material";
import React from "react";
import { cardsAPI } from "../../service/cardsApi";
import { Loader } from "../misc/Loader";
import { Flashcard } from "./Flashcard";

export const FlashcardsComponent: React.FC = () => {
  const { data: flashcards, isLoading: fL } =
    cardsAPI.useGetCardsQuery(undefined);
  const { data: settings, isLoading: sL } = cardsAPI.useGetSettingsQuery();
  const loading = fL || sL;

  if (loading) return <Loader />;
  if (!flashcards || !settings) return null;
  if (flashcards.length === 0) {
    return <Typography variant="h5">no flashcards</Typography>;
  }
  return <Flashcard flashcard={flashcards[0]} />;
};
