import React from "react";
import { IFlashcard } from "../../models/flashcard";
import { Favorite } from "./Favorite";

export const FavoritesList: React.FC = () => {
  const favorites: IFlashcard[] = [
    { id: "1", favorite: true },
    { id: "2", favorite: true },
  ];

  return (
    <div>
      <div>Favorites:</div>
      <div>
        {favorites.map((favorite) => (
          <Favorite favorite={favorite} key={favorite.id} />
        ))}
      </div>
    </div>
  );
};
