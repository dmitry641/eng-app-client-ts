import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import React, { ChangeEvent } from "react";
import { CardsSettingsType, cardsSettings } from "../../models/flashcard";
import { cardsAPI } from "../../service/cardsApi";
import { Loader } from "../misc/Loader";

export const FlashcardsSettings: React.FC = () => {
  const { data: settings, isLoading } = cardsAPI.useGetSettingsQuery();
  const [update, { isLoading: utLoading }] = cardsAPI.useUpdateMutation();
  const btnLoading = utLoading;

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    update({
      type: e.target.name as CardsSettingsType,
      value: e.target.checked,
    });
  };

  if (isLoading) return <Loader />;
  if (!settings) return null;
  return (
    <div>
      {Object.entries(cardsSettings).map((el, idx) => {
        return (
          <FormGroup key={idx}>
            <FormControlLabel
              disabled={btnLoading}
              control={
                <Switch
                  name={el[0]}
                  checked={settings[el[0] as CardsSettingsType]}
                  onChange={changeHandler}
                />
              }
              label={el[1].label}
            />
          </FormGroup>
        );
      })}
    </div>
  );
};
