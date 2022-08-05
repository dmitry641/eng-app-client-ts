import React from "react";
import { cardsAPI } from "../../service/cardsApi";
import { Loader } from "../misc/Loader";
import { Favorite } from "./Favorite";

export const FavoritesList: React.FC = () => {
  const { data: favorites, isLoading } = cardsAPI.useGetFavoritesQuery();

  if (isLoading) return <Loader />;
  if (!favorites) return null;
  if (favorites.length === 0) return <div>no favorites</div>;
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
