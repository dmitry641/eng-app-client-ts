import React from "react";
import { IUserCard } from "../../models/flashcard";
import { cardsAPI } from "../../service/cardsApi";

interface FavoriteProps {
  favorite: IUserCard;
}

export const Favorite: React.FC<FavoriteProps> = ({ favorite }) => {
  const [unfavorite, { isLoading }] = cardsAPI.useFavoriteMutation();
  const btnLoading = isLoading;

  const unfavoriteHandler = () => {
    unfavorite(favorite.id);
  };

  return (
    <div
      style={{
        border: "1px solid black",
        marginBottom: "10px",
        padding: "5px",
      }}
    >
      <p>{favorite.card.frontPrimary}</p>
      <p>{favorite.card.backPrimary}</p>
      <button disabled={btnLoading} onClick={unfavoriteHandler}>
        Unfavorite
      </button>
    </div>
  );
};
