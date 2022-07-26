import React from "react";
import { IDeck } from "../../models/deck";

interface DeckProps {
  deck: IDeck;
}

export const Deck: React.FC<DeckProps> = ({ deck }) => {
  return (
    <div>
      <p>Deck id - {deck.id}</p>
    </div>
  );
};
