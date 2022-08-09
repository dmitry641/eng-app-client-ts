import React from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { SessionComponent } from "./SessionComponent";
import { Settings } from "./Settings";

export const Account: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const { userLogout } = useActions();

  return (
    <div>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <Settings />
      <SessionComponent />
      <div>
        <button onClick={() => userLogout()}>Logout</button>
      </div>
    </div>
  );
};
