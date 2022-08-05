import React, { useRef, useState } from "react";
import { useFlashcards } from "../../hooks/useFlashcards";
import { useSide } from "../../hooks/useSide";
import { IFlashcard, StatusEnum } from "../../models/flashcard";
import { cardsAPI } from "../../service/cardsApi";

export const Flashcard: React.FC = () => {
  const { flashcard, isFetching, lrnTrigger } = useFlashcards();

  if (!flashcard) return null;
  return (
    <Card
      flashcard={flashcard}
      lrnTrigger={lrnTrigger}
      isFetching={isFetching}
    />
  );
};

interface CardProps {
  flashcard: IFlashcard;
  lrnTrigger: () => void;
  isFetching: boolean;
}

const Card: React.FC<CardProps> = ({ flashcard, lrnTrigger, isFetching }) => {
  const [frontSide, switchSide] = useSide();
  const [playing, setPlaying] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const [fav, { isLoading: fL }] = cardsAPI.useFavoriteMutation();
  const [del, { isLoading: dL }] = cardsAPI.useFavoriteMutation();
  const [lrn, { isLoading: lL }] = cardsAPI.useLearnMutation();
  const btnLoading = isFetching || fL || dL || lL;
  const currentCardText = frontSide
    ? flashcard.card.frontPrimary
    : flashcard.card.backPrimary;

  const flipHandler = switchSide;
  const deleteHandler = () => {
    del(flashcard.id);
  };
  const favoriteHandler = () => {
    fav(flashcard.id);
  };
  const learnHandler = async (status: StatusEnum) => {
    try {
      await lrn({ userCardId: flashcard.id, status }).unwrap();
      lrnTrigger();
    } catch (error) {}
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
      msg.text = currentCardText;
      synthRef.current.speak(msg);
    }
  };

  return (
    <div>
      <div>
        <button disabled={btnLoading} onClick={deleteHandler}>
          delete
        </button>
        <button disabled={btnLoading} onClick={flipHandler}>
          flip
        </button>
        <button disabled={btnLoading} onClick={favoriteHandler}>
          {flashcard.favorite ? "unfavorite" : "favorite"}
        </button>
      </div>
      <div onClick={playStopHandler}>{currentCardText}</div>
      <div>
        <button
          disabled={btnLoading}
          onClick={() => learnHandler(StatusEnum.easy)}
        >
          easy
        </button>
        <button
          disabled={btnLoading}
          onClick={() => learnHandler(StatusEnum.medium)}
        >
          medium
        </button>
        <button
          disabled={btnLoading}
          onClick={() => learnHandler(StatusEnum.hard)}
        >
          hard
        </button>
      </div>
    </div>
  );
};
