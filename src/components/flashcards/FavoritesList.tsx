import { Stack, Typography } from "@mui/material";
import React from "react";
import { usePagination } from "../../hooks/usePagination";
import { cardsAPI } from "../../service/cardsApi";
import { Loader } from "../misc/Loader";
import { MyPagination } from "../misc/MyPagination";
import { Favorite } from "./Favorite";

export const FavoritesList: React.FC = () => {
  const { data: favorites = [], isLoading } = cardsAPI.useGetFavoritesQuery();
  const { jump, currentData, currentPage, maxPage } = usePagination(favorites);

  if (isLoading) return <Loader />;
  if (!favorites?.length) return null;
  return (
    <div>
      <Typography gutterBottom>Favorites:</Typography>
      <Stack spacing={2}>
        {currentData().map((favorite) => (
          <Favorite favorite={favorite} key={favorite.id} />
        ))}
      </Stack>
      <MyPagination
        currentPage={currentPage}
        maxPage={maxPage}
        onPageChange={jump}
      />
    </div>
  );
};
