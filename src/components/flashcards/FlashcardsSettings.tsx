import React, { ChangeEvent } from "react";
import { settingsArray, UpdateTypeEnum } from "../../models/flashcard";
import { cardsAPI } from "../../service/cardsApi";
import { Loader } from "../misc/Loader";

export const FlashcardsSettings: React.FC = () => {
  const {
    data: settings,
    isLoading,
    isFetching,
  } = cardsAPI.useGetSettingsQuery();
  const [update, { isLoading: utLoading }] = cardsAPI.useUpdateMutation();
  const btnLoading = isFetching || utLoading;

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    update({
      type: e.target.name as UpdateTypeEnum,
      value: e.target.checked,
    });
  };

  if (isLoading) return <Loader />;
  if (!settings) return null;
  return (
    <>
      {settingsArray.map((el, idx) => {
        return (
          <div key={idx}>
            <div>
              <input
                disabled={btnLoading}
                type="checkbox"
                name={UpdateTypeEnum[el.type]}
                id={UpdateTypeEnum[el.type]}
                checked={settings[el.type]}
                onChange={changeHandler}
              />
              <label htmlFor={UpdateTypeEnum[el.type]}>{el.label}</label>
            </div>
            <br />
          </div>
        );
      })}
    </>
  );
};
