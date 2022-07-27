import React from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { appSetRedirectTo } from "../../redux/actions/app-actions";
import { RoutesEnum } from "../../routes";

export const DeckCreate: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div>Filetype: csv</div>
      <div>
        Format: frontPrimary, frontSecondary?, backPrimary, backSecondary?
      </div>
      <div>
        <button
          onClick={() =>
            dispatch(appSetRedirectTo(RoutesEnum.FLASHCARDS_SETTINGS))
          }
        >
          Add deck
        </button>
      </div>
    </div>
  );
};
