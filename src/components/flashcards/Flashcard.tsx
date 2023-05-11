import {
  Delete,
  East,
  FlipToBack,
  FlipToFront,
  Star,
  StarBorder,
  West,
} from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useSide } from "../../hooks/useSide";
import { IUserCard } from "../../models/flashcard";
import { cardsAPI } from "../../service/cardsApi";

interface FlashcardProps {
  flashcard: IUserCard;
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
  const {
    frontSide,
    primaryText,
    secondaryText,
    switchSide: flipHandler,
  } = useSide(flashcard);
  const [playing, setPlaying] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const [fav, { isLoading: fL }] = cardsAPI.useFavoriteMutation();
  const [del, { isLoading: dL }] = cardsAPI.useDeleteMutation();
  const [lrn, { isLoading: lL }] = cardsAPI.useLearnMutation();
  const btnLoading = fL || dL || lL;

  const deleteHandler = () => {
    del(flashcard.id);
  };
  const favoriteHandler = () => {
    fav(flashcard.id);
  };
  const learnHandler = (status: boolean) => {
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
      msg.text = primaryText;
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
          <Typography color="text.secondary">{secondaryText}</Typography>
          <Typography
            variant="h6"
            onClick={playStopHandler}
            sx={{ cursor: "pointer" }}
          >
            {primaryText}
          </Typography>
        </Stack>

        {frontSide && (
          <Typography mb={2} variant="body2" color="text.secondary">
            Do you remember the context? Can you give some examples?
          </Typography>
        )}

        <ButtonGroup fullWidth size="large" sx={{ fontSize: "3rem" }}>
          <Tooltip title={flashcard.stepBack}>
            <Button
              aria-label="no"
              variant="outlined"
              startIcon={<West color="error" />}
              onClick={() => learnHandler(false)}
            >
              no
            </Button>
          </Tooltip>
          <Tooltip title={flashcard.stepForward}>
            <Button
              aria-label="yes"
              variant="outlined"
              endIcon={<East color="success" />}
              onClick={() => learnHandler(true)}
            >
              yes
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Stack>
    </Paper>
  );
};
