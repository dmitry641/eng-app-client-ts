import React from "react";
import { IFlashcard } from "../../models/flashcard";

interface FlashcardProps {
  flashcard: IFlashcard;
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
  return (
    <div>
      <div>
        <button>favorite</button>
        <button>flip</button>
        <button>delete</button>
      </div>
      <div>Flashcard id - {flashcard.id}</div>
      <div>
        <button>easy</button>
        <button>medium</button>
        <button>hard</button>
      </div>
    </div>
  );
};
