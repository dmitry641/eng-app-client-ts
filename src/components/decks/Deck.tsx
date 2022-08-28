import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { IDeck } from "../../models/deck";
import { decksAPI } from "../../service/decksApi";
import { MyPaper } from "../misc/MyPaper";

interface DeckProps {
  deck: IDeck;
}

export const Deck: React.FC<DeckProps> = ({ deck }) => {
  const [add, { isLoading }] = decksAPI.useAddPDtoUDMutation();
  const btnLoading = isLoading;

  const addHandler = () => {
    add(deck.id);
  };

  return (
    <MyPaper>
      <Stack p={2} spacing={0.5}>
        <Typography>Name: {deck.name}</Typography>
        <Typography>Cards count: {deck.totalCardsCount}</Typography>
        <Typography>Author: {deck.createdBy.name}</Typography>
        <Button variant="outlined" disabled={btnLoading} onClick={addHandler}>
          Add
        </Button>
      </Stack>
    </MyPaper>
  );
};
