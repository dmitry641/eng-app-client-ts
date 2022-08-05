import { useEffect, useState } from "react";
import { cardsAPI } from "../service/cardsApi";

// FIXME, проблема с хуком так и не решенна
export const useFlashcards = () => {
  const { data: cards, refetch, isFetching } = cardsAPI.useGetCardsQuery();
  const [isRefetch, setIsRefetch] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [cards]);

  useEffect(() => {
    if (!isRefetch) return;
    refetch();
    setIsRefetch(false);
  }, [isRefetch, refetch]);

  const lrnTrigger = () => {
    const newIndex = index + 1;
    const newCard = cards?.[newIndex];
    if (!newCard) {
      setIsRefetch(true);
      return;
    }
    setIndex(newIndex);
  };

  return { flashcard: cards?.[index], isFetching, lrnTrigger };
};
