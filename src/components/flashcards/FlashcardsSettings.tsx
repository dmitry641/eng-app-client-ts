import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import React, { ChangeEvent } from "react";
import { settingsArray, UpdateTypeEnum } from "../../models/flashcard";
import { cardsAPI } from "../../service/cardsApi";
import { Loader } from "../misc/Loader";

export const FlashcardsSettings: React.FC = () => {
  const { data: settings, isLoading } = cardsAPI.useGetSettingsQuery();
  const [update, { isLoading: utLoading }] = cardsAPI.useUpdateMutation();
  const btnLoading = utLoading;

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    update({
      type: e.target.name as UpdateTypeEnum,
      value: e.target.checked,
    });
  };

  if (isLoading) return <Loader />;
  if (!settings) return null;
  return (
    <div>
      {settingsArray.map((el, idx) => {
        return (
          <FormGroup key={idx}>
            <FormControlLabel
              disabled={btnLoading}
              control={
                <Switch
                  name={UpdateTypeEnum[el.type]}
                  checked={settings[el.type]}
                  onChange={changeHandler}
                />
              }
              label={el.label}
            />
          </FormGroup>
        );
      })}
    </div>
  );
};
