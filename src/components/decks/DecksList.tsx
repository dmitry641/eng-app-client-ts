import React from "react";
import { IDeck } from "../../models/deck";
import { Deck } from "./Deck";

export const DecksList: React.FC = () => {
  const decks: IDeck[] = [{ id: "1" }, { id: "2" }];

  return (
    <div>
      <div>Decks:</div>
      <div>
        {decks.map((deck) => (
          <Deck deck={deck} key={deck.id} />
        ))}
      </div>
    </div>
  );
};
