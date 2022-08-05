import React from "react";
import { IDeck } from "../../models/deck";
import { cardsAPI } from "../../service/cardsApi";
import { decksAPI } from "../../service/decksApi";

interface DeckProps {
  deck: IDeck;
}

export const Deck: React.FC<DeckProps> = ({ deck }) => {
  const { refetch: refetchCards } = cardsAPI.useGetCardsQuery();
  const [add, { isLoading }] = decksAPI.useAddPDtoUDMutation();

  const addHandler = async () => {
    try {
      await add(deck.id).unwrap();
      refetchCards();
    } catch (error) {}
  };

  return (
    <div
      style={{
        border: "1px solid black",
        marginBottom: "10px",
        padding: "5px",
      }}
    >
      <p>Id: {deck.id}</p>
      <p>Name: {deck.name}</p>
      <p>Total cards count: {deck.totalCardsCount}</p>
      <p>Author: {deck.author}</p>
      <button disabled={isLoading} onClick={addHandler}>
        Add to the user decks
      </button>
    </div>
  );
};
