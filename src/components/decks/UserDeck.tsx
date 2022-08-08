import React from "react";
import { IUserDeck, MoveUserDeck } from "../../models/deck";
import { decksAPI } from "../../service/decksApi";

interface UserDeckProps {
  userDeck: IUserDeck;
}

export const UserDeck: React.FC<UserDeckProps> = ({ userDeck }) => {
  const [enable, { isLoading: enL }] = decksAPI.useEnableMutation();
  const [move, { isLoading: mvL }] = decksAPI.useMoveMutation();
  const [deleteUD, { isLoading: dlL }] = decksAPI.useDeleteMutation();
  const [toggle, { isLoading: tgL }] = decksAPI.useToggleUDToPDMutation();
  const [deleteDD, { isLoading: ddL }] = decksAPI.useDeleteDynamicMutation();
  const btnLoading = enL || mvL || dlL || tgL || ddL;

  const enableHandler = () => {
    enable(userDeck.id);
  };
  const moveHandler = (position: MoveUserDeck["position"]) => {
    move({ userDeckId: userDeck.id, position });
  };
  const deleteHandler = () => {
    if (userDeck.dynamic) {
      deleteDD(userDeck.id);
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
        <button disabled={btnLoading} onClick={enableHandler}>
          {userDeck.enabled ? "Disable" : "Enable"}
        </button>
        <button disabled={btnLoading} onClick={() => moveHandler("up")}>
          Move up
        </button>
        <button disabled={btnLoading} onClick={() => moveHandler("down")}>
          Move down
        </button>
        <button disabled={btnLoading} onClick={deleteHandler}>
          Delete
        </button>
        {userDeck.canPublicIt && (
          <button disabled={btnLoading} onClick={toggleHandler}>
            {userDeck.published ? "Unpublish" : "Publish"}
          </button>
        )}
      </div>
    </div>
  );
};
