import { Typography } from "@mui/material";
import React from "react";
import { ISession } from "../../models/user";

interface SessionProps {
  session: ISession;
}

export const Session: React.FC<SessionProps> = ({ session }) => {
  return (
    <>
      <Typography variant="body1">{`IP: ${session.ip}`}</Typography>
      <Typography
        variant="body2"
        color="textSecondary"
      >{`UserAgent: ${session.userAgent}`}</Typography>
    </>
  );
};
