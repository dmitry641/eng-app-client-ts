import React from "react";
import { IDeck } from "../../models/deck";
import { decksAPI } from "../../service/decksApi";

interface DeckProps {
  deck: IDeck;
}

export const Deck: React.FC<DeckProps> = ({ deck }) => {
  const [add, { isLoading }] = decksAPI.useAddPDtoUDMutation();

  const addHandler = () => {
    add(deck.id);
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
