import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { IUserCard } from "../../models/flashcard";
import { cardsAPI } from "../../service/cardsApi";
import { MyPaper } from "../misc/MyPaper";

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
    <MyPaper>
      <Stack p={2} spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography>{favorite.card.frontPrimary}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>{favorite.card.backPrimary}</Typography>
          </Grid>
          {favorite.card.frontSecondary && (
            <Grid item xs={12} sm={6}>
              <Typography>{favorite.card.frontSecondary}</Typography>
            </Grid>
          )}
          {favorite.card.backSecondary && (
            <Grid item xs={12} sm={6}>
              <Typography>{favorite.card.backSecondary}</Typography>
            </Grid>
          )}
        </Grid>

        <Button
          variant="outlined"
          disabled={btnLoading}
          onClick={unfavoriteHandler}
        >
          Unfavorite
        </Button>
      </Stack>
    </MyPaper>
  );
};
