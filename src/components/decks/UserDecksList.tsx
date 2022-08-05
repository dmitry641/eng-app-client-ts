import React from "react";
import { decksAPI } from "../../service/decksApi";
import { Loader } from "../misc/Loader";
import { UserDeck } from "./UserDeck";

export const UserDecksList: React.FC = () => {
  const { data: userDecks, isLoading } = decksAPI.useGetUserDecksQuery();

  if (isLoading) return <Loader />;
  if (!userDecks) return null;
  if (userDecks.length === 0) return <div>no user decks</div>;
  return (
    <div>
      <div>User decks:</div>
      <div>
        {userDecks.map((userDeck) => (
          <UserDeck userDeck={userDeck} key={userDeck.id} />
        ))}
      </div>
    </div>
  );
};
