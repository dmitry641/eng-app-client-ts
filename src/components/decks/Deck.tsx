import React from "react";
import { IDeck } from "../../models/deck";
import { decksAPI } from "../../service/decksApi";

interface DeckProps {
  deck: IDeck;
  isFetching: boolean;
}

export const Deck: React.FC<DeckProps> = ({ deck, isFetching }) => {
  const [add, { isLoading }] = decksAPI.useAddPDtoUDMutation();
  const btnLoading = isLoading || isFetching;

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
      <p>Author: {deck.createdBy.name}</p>
      <button disabled={btnLoading} onClick={addHandler}>
        Add to the user decks
      </button>
    </div>
  );
};
