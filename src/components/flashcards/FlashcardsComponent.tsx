import React from "react";
import { IFlashcard } from "../../models/flashcard";
import { Flashcard } from "./Flashcard";

export const FlashcardsComponent: React.FC = () => {
  const flashcards: IFlashcard[] = [{ favorite: false, id: "123" }];

  // if loading Loader
  // if length == 1 refetch once
  // if length == 0 'no flashcards'
  return (
    <div>
      <Flashcard flashcard={flashcards[0]} />
    </div>
  );
};
