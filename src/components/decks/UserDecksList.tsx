import React from "react";
import { decksAPI } from "../../service/decksApi";
import { Loader } from "../misc/Loader";
import { UserDeck } from "./UserDeck";

export const UserDecksList: React.FC = () => {
  const { data, isLoading } = decksAPI.useGetUserDecksQuery();

  if (isLoading) return <Loader />;
  if (!data) return null;
  if (data.length === 0) return <div>no user decks</div>;
  return (
    <div>
      <div>User decks:</div>
      <div>
        {data.map((userDeck) => (
          <UserDeck userDeck={userDeck} key={userDeck.id} />
        ))}
      </div>
    </div>
  );
};
