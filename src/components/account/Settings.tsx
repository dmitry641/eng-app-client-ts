import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { UpdUserSettingsEnum } from "../../models/user";

export const Settings: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const { userUpdateSettings } = useActions();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    userUpdateSettings({
      type: e.target.name as UpdUserSettingsEnum,
      value: e.target.checked,
    });
  };

  return (
    <FormGroup>
      <FormControlLabel
        disabled={user.btnLoading}
        control={
          <Switch
            name={UpdUserSettingsEnum.darkMode}
            checked={user.settings.darkMode}
            onChange={changeHandler}
          />
        }
        label="Dark mode"
      />
    </FormGroup>
  );
};
