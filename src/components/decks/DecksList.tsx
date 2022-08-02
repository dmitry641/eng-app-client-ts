import React from "react";
import { decksAPI } from "../../service/decksApi";
import { Loader } from "../misc/Loader";
import { Deck } from "./Deck";

export const DecksList: React.FC = () => {
  const { data, isLoading } = decksAPI.useGetDecksQuery();

  if (isLoading) return <Loader />;
  if (!data) return null;
  if (data.length === 0) return <div>no public decks</div>;
  return (
    <div>
      <div>Public decks:</div>
      <div>
        {data.map((deck) => (
          <Deck deck={deck} key={deck.id} />
        ))}
      </div>
    </div>
  );
};
