import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { usePagination } from "../../hooks/usePagination";
import { decksAPI } from "../../service/decksApi";
import { Loader } from "../misc/Loader";
import { MyPagination } from "../misc/MyPagination";
import { Deck } from "./Deck";

export const DecksList: React.FC = () => {
  const { data: decks = [], isLoading } = decksAPI.useGetDecksQuery();
  const { jump, currentData, currentPage, maxPage } = usePagination(decks);

  if (isLoading) return <Loader />;
  if (!decks?.length) return null;
  return (
    <Grid item xs={12} sm>
      <Typography gutterBottom>Public decks:</Typography>
      <Stack spacing={2}>
        {currentData().map((deck) => (
          <Deck deck={deck} key={deck.id} />
        ))}
      </Stack>
      <MyPagination
        currentPage={currentPage}
        maxPage={maxPage}
        onPageChange={jump}
      />
    </Grid>
  );
};
