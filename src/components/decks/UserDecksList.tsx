import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { usePagination } from "../../hooks/usePagination";
import { decksAPI } from "../../service/decksApi";
import { Loader } from "../misc/Loader";
import { MyPagination } from "../misc/MyPagination";
import { UserDeck } from "./UserDeck";

export const UserDecksList: React.FC = () => {
  const { data: userDecks = [], isLoading } = decksAPI.useGetUserDecksQuery();
  const { jump, currentData, currentPage, maxPage } = usePagination(userDecks);

  if (isLoading) return <Loader />;
  if (!userDecks?.length) return null;
  return (
    <Grid item flexGrow={1}>
      <Typography gutterBottom>User decks:</Typography>
      <Stack spacing={2}>
        {currentData().map((userDeck) => (
          <UserDeck userDeck={userDeck} key={userDeck.id} />
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
