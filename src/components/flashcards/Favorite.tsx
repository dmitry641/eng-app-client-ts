import React from "react";
import { IFlashcard } from "../../models/flashcard";

interface FavoriteProps {
  favorite: IFlashcard;
}

export const Favorite: React.FC<FavoriteProps> = ({ favorite }) => {
  return (
    <div>
      <p>Favorite id - {favorite.id}</p>
    </div>
  );
};
