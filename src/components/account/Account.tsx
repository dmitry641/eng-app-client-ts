import React from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { SessionComponent } from "./SessionComponent";

export const Account: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const { userLogout } = useActions();

  return (
    <div>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <div>settings...</div>
      <div>
        <SessionComponent />
      </div>
      <div>
        <button onClick={() => userLogout()}>Logout</button>
      </div>
    </div>
  );
};
