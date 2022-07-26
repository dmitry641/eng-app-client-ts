import React from "react";
import { SessionComponent } from "./SessionComponent";

export const Account: React.FC = () => {
  return (
    <div>
      <div>user name</div>
      <div>settings...</div>
      <div>
        <SessionComponent />
      </div>
      <div>
        <button>logout</button>
      </div>
    </div>
  );
};
