import React from "react";
import { cardsAPI } from "../../service/cardsApi";
import { Loader } from "../misc/Loader";
import { Flashcard } from "./Flashcard";

export const FlashcardsComponent: React.FC = () => {
  const { data: flashcards, isLoading: cL } = cardsAPI.useGetCardsQuery();
  const { data: settings, isLoading: sL } = cardsAPI.useGetSettingsQuery();
  const loading = cL || sL;

  if (loading) return <Loader />;
  if (!flashcards || !settings) return null;
  if (flashcards.length === 0) return <div>no flashcards</div>;
  return <Flashcard />;
};
