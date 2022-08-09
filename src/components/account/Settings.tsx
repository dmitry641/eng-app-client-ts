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
    <div>
      <input
        disabled={user.btnLoading}
        type="checkbox"
        name={UpdUserSettingsEnum.darkMode}
        id={UpdUserSettingsEnum.darkMode}
        checked={user.settings.darkMode}
        onChange={changeHandler}
      />
      <label htmlFor={UpdUserSettingsEnum.darkMode}>Dark mode</label>
    </div>
  );
};
