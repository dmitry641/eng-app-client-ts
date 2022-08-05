import React from "react";
import { IFlashcard } from "../../models/flashcard";
import { cardsAPI } from "../../service/cardsApi";

interface FavoriteProps {
  favorite: IFlashcard;
}

export const Favorite: React.FC<FavoriteProps> = ({ favorite }) => {
  const { isFetching } = cardsAPI.useGetFavoritesQuery();
  const [unfavorite, { isLoading: unLoading }] = cardsAPI.useFavoriteMutation();
  const btnLoading = unLoading || isFetching;

  const unfavoriteHandler = async () => {
    try {
      await unfavorite(favorite.id).unwrap();
    } catch (error) {}
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
