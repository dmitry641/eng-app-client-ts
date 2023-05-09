import { ArrowDownward, ArrowUpward, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { IUserDeck, MoveUserDeck } from "../../models/deck";
import { decksAPI } from "../../service/decksApi";
import { MyPaper } from "../misc/MyPaper";

interface UserDeckProps {
  userDeck: IUserDeck;
}

export const UserDeck: React.FC<UserDeckProps> = ({ userDeck }) => {
  const [enable, { isLoading: enL }] = decksAPI.useEnableMutation();
  const [move, { isLoading: mvL }] = decksAPI.useMoveMutation();
  const [deleteUD, { isLoading: dlL }] = decksAPI.useDeleteMutation();
  const [publish, { isLoading: tgL }] = decksAPI.usePublishMutation();
  const btnLoading = enL || mvL || dlL || tgL;

  const enableHandler = () => {
    enable(userDeck.id);
  };
  const moveHandler = (position: MoveUserDeck["position"]) => {
    move({ userDeckId: userDeck.id, position });
  };
  const deleteHandler = () => {
    deleteUD(userDeck);
  };
  const publishHandler = () => {
    publish(userDeck.id);
  };

  return (
    <MyPaper>
      <Stack direction="row" p={1}>
        <Stack alignItems="center" justifyContent="space-between">
          <IconButton
            aria-label="up"
            disabled={btnLoading}
            onClick={() => moveHandler("up")}
          >
            <ArrowUpward />
          </IconButton>
          <IconButton
            aria-label="down"
            disabled={btnLoading}
            onClick={() => moveHandler("down")}
          >
            <ArrowDownward />
          </IconButton>
        </Stack>
        <Stack
          flexGrow={1}
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Box textAlign="center">
            <Typography>{userDeck.deck.name}</Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >{`Learned cards: ${userDeck.cardsLearned}/${userDeck.cardsCount}`}</Typography>
          </Box>

          {userDeck.canPublish && (
            <Box>
              <Button disabled={btnLoading} onClick={publishHandler}>
                {userDeck.published ? "Unpublish" : "Publish"}
              </Button>
            </Box>
          )}
        </Stack>
        <Stack alignItems="center" justifyContent="space-between">
          <Switch
            aria-label={userDeck.enabled ? "disable" : "enable"}
            checked={userDeck.enabled}
            disabled={btnLoading}
            onClick={enableHandler}
          />

          <IconButton
            aria-label="delete"
            disabled={btnLoading}
            onClick={deleteHandler}
          >
            <Delete />
          </IconButton>
        </Stack>
      </Stack>
    </MyPaper>
  );
};
