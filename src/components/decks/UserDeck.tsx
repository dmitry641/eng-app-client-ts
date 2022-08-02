import React from "react";
import { IUserDeck, MoveUserDeck } from "../../models/deck";
import { decksAPI } from "../../service/decksApi";

interface UserDeckProps {
  userDeck: IUserDeck;
}

export const UserDeck: React.FC<UserDeckProps> = ({ userDeck }) => {
  const [enable, { isLoading: enLoading }] = decksAPI.useEnableMutation();
  const [move, { isLoading: mvLoading }] = decksAPI.useMoveMutation();
  const [deleteUD, { isLoading: dlLoading }] = decksAPI.useDeleteMutation();
  const [toggle, { isLoading: tgLoading }] = decksAPI.useToggleUDToPDMutation();
  const [deleteDD, { isLoading: ddLoading }] =
    decksAPI.useDeleteDynamicMutation();

  const loading = enLoading || mvLoading || dlLoading || tgLoading || ddLoading;

  const enableHandler = () => {
    enable(userDeck.id);
  };
  const moveHandler = (position: MoveUserDeck["position"]) => {
    move({ userDeckId: userDeck.id, position });
  };
  const deleteHandler = () => {
    if (userDeck.dynamic) {
      deleteDD();
    } else {
      deleteUD(userDeck.id);
    }
  };
  const toggleHandler = () => {
    toggle(userDeck.id);
  };

  return (
    <div
      style={{
        border: "1px solid black",
        marginBottom: "10px",
        padding: "5px",
      }}
    >
      <p>
        Id: {userDeck.id} | DeckId: {userDeck.deckId}
      </p>
      <p>Name: {userDeck.deckName}</p>
      <p>Order: {userDeck.order}</p>
      <p>
        {`Cards count: ${userDeck.cardsCount} | Cards learned: ${userDeck.cardsLearned}`}
      </p>
      <div>
        <button disabled={loading} onClick={enableHandler}>
          {userDeck.enabled ? "Disable" : "Enable"}
        </button>
        <button disabled={loading} onClick={() => moveHandler("up")}>
          Move up
        </button>
        <button disabled={loading} onClick={() => moveHandler("down")}>
          Move down
        </button>
        <button disabled={loading} onClick={deleteHandler}>
          Delete
        </button>
        {userDeck.canPublicIt && (
          <button disabled={loading} onClick={toggleHandler}>
            {userDeck.published ? "Unpublish" : "Publish"}
          </button>
        )}
      </div>
    </div>
  );
};
