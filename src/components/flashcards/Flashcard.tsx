import {
  Delete,
  Star,
  StarBorder,
  StopCircle,
  VolumeUp,
} from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useSide } from "../../hooks/useSide";
import { IUserCard, StatusEnum } from "../../models/flashcard";
import { cardsAPI } from "../../service/cardsApi";

interface FlashcardProps {
  flashcard: IUserCard;
  isFetching: boolean;
}

export const Flashcard: React.FC<FlashcardProps> = ({
  flashcard,
  isFetching,
}) => {
  const [frontSide, switchSide] = useSide();
  const [playing, setPlaying] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const [fav, { isLoading: fL }] = cardsAPI.useFavoriteMutation();
  const [del, { isLoading: dL }] = cardsAPI.useDeleteMutation();
  const [lrn, { isLoading: lL }] = cardsAPI.useLearnMutation();
  const btnLoading = isFetching || fL || dL || lL;
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
          <IconButton
            aria-label="flip"
            onClick={playStopHandler}
            color="primary"
          >
            {playing ? (
              <StopCircle fontSize="large" />
            ) : (
              <VolumeUp fontSize="large" />
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
            onClick={flipHandler}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            {currentPrimaryText}
          </Typography>
        </Stack>

        <ButtonGroup
          fullWidth
          variant="text"
          size="large"
          disabled={btnLoading}
        >
          <Button onClick={() => learnHandler(StatusEnum.hard)}>hard</Button>
          <Button onClick={() => learnHandler(StatusEnum.medium)}>
            medium
          </Button>
          <Button onClick={() => learnHandler(StatusEnum.easy)}>easy</Button>
        </ButtonGroup>
      </Stack>
    </Paper>
  );
};
