import { useEffect, useState } from "react";
import { IUserCard } from "../models/flashcard";

export const useSide = (flashcard: IUserCard) => {
  const [frontSide, setFrontSide] = useState(true);
  const primaryText = frontSide
    ? flashcard.card.frontPrimary
    : flashcard.card.backPrimary;
  const secondaryText = frontSide
    ? flashcard.card.frontSecondary
    : flashcard.card.backSecondary;

  useEffect(() => {
    if (flashcard.streak === 0) {
      setFrontSide(false);
    }
  }, [flashcard]);

  const switchSide = () => {
    setFrontSide((prev) => !prev);
  };

  return { primaryText, secondaryText, frontSide, switchSide };
};
