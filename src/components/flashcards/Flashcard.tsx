import {
  Delete,
  FlipToBack,
  FlipToFront,
  Star,
  StarBorder,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import React, { useRef, useState } from "react";
import { useSide } from "../../hooks/useSide";
import { IUserCard, StatusEnum } from "../../models/flashcard";
import { cardsAPI } from "../../service/cardsApi";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

interface FlashcardProps {
  flashcard: IUserCard;
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
  const [frontSide, switchSide] = useSide();
  const [playing, setPlaying] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const [fav, { isLoading: fL }] = cardsAPI.useFavoriteMutation();
  const [del, { isLoading: dL }] = cardsAPI.useDeleteMutation();
  const [lrn, { isLoading: lL }] = cardsAPI.useLearnMutation();
  const btnLoading = fL || dL || lL;
  const currentPrimaryText = frontSide
    ? flashcard.card.frontPrimary
    : flashcard.card.backPrimary;
  const currentSecondaryText = frontSide
    ? flashcard.card.frontSecondary
    : flashcard.card.backSecondary;

  const flipHandler = switchSide;
  const deleteHandler = () => {
    del(flashcard.id);
  };
  const favoriteHandler = () => {
    fav(flashcard.id);
  };
  const learnHandler = (status: StatusEnum) => {
    lrn({ userCardId: flashcard.id, status });
  };
  const playStopHandler = () => {
    if (playing) {
      synthRef.current.cancel();
      setPlaying(false);
    } else {
      setPlaying(true);
      const msg = new SpeechSynthesisUtterance();
      msg.lang = "en-US";
      const voicesList = synthRef.current.getVoices();
      const voice = voicesList.find((v) => v.lang === "en-US");
      if (voice) msg.voice = voice;
      msg.onend = () => setPlaying(false);
      msg.text = currentPrimaryText;
      synthRef.current.speak(msg);
    }
  };

  return (
    <Paper>
      <Stack
        p={3}
        height="60vh"
        sx={{ width: { xs: "auto", sm: "500px" } }}
        justifyContent="center"
        alignItems="center"
      >
        <Stack width="100%" direction="row" justifyContent="space-between">
          <IconButton
            aria-label="delete"
            disabled={btnLoading}
            onClick={deleteHandler}
            color="primary"
          >
            <Delete fontSize="large" />
          </IconButton>
          <IconButton aria-label="flip" onClick={flipHandler} color="primary">
            {frontSide ? (
              <FlipToFront fontSize="large" />
            ) : (
              <FlipToBack fontSize="large" />
            )}
          </IconButton>
          <IconButton
            aria-label={flashcard.favorite ? "unfavorite" : "favorite"}
            disabled={btnLoading}
            onClick={favoriteHandler}
            color="primary"
          >
            {flashcard.favorite ? (
              <Star fontSize="large" />
            ) : (
              <StarBorder fontSize="large" />
            )}
          </IconButton>
        </Stack>

        <Stack flexGrow={1} justifyContent="center">
          <Typography color="text.secondary">{currentSecondaryText}</Typography>
          <Typography
            variant="h6"
            onClick={playStopHandler}
            sx={{ cursor: "pointer" }}
          >
            {currentPrimaryText}
          </Typography>
        </Stack>

        <Stack
          width="100%"
          direction="row"
          spacing={2}
          justifyContent="space-evenly"
          alignItems="center"
        >
          {Object.values(StatusEnum).map((status, idx) => {
            let lastDate = 0;
            let count = 0;
            flashcard.history.forEach((obj) => {
              if (obj.status === status) {
                count++;
                lastDate = Math.max(lastDate, obj.date);
              }
            });

            return (
              <Box key={idx}>
                <Tooltip title={count ? timeAgo.format(lastDate) : ""}>
                  <Badge badgeContent={count} color="primary">
                    <Button
                      variant="text"
                      size="large"
                      disabled={btnLoading}
                      onClick={() => learnHandler(status)}
                    >
                      {status}
                    </Button>
                  </Badge>
                </Tooltip>
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Paper>
  );
};
