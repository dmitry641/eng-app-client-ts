import React from "react";
import { decksAPI } from "../../service/decksApi";
import { Loader } from "../misc/Loader";
import { Deck } from "./Deck";

export const DecksList: React.FC = () => {
  const { data: decks, isLoading } = decksAPI.useGetDecksQuery();

  if (isLoading) return <Loader />;
  if (!decks) return null;
  if (decks.length === 0) return <div>no public decks</div>;
  return (
    <div>
      <div>Public decks:</div>
      <div>
        {decks.map((deck) => (
          <Deck deck={deck} key={deck.id} />
        ))}
      </div>
    </div>
  );
};
