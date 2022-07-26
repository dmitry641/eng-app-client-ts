import React from "react";
import { ISession } from "../../models/session";

interface SessionProps {
  session: ISession;
}

export const Session: React.FC<SessionProps> = ({ session }) => {
  return (
    <div>
      <p>{`IP: ${session.ip}`}</p>
      <p>{`UserAgent: ${session.userAgent}`}</p>
    </div>
  );
};
