import { Stack } from "@mui/material";
import React from "react";
import { ISession } from "../../models/session";
import { Loader } from "../misc/Loader";
import { Session } from "./Session";

interface SessionsListProps {
  loading: boolean;
  sessions: ISession[];
}

export const SessionsList: React.FC<SessionsListProps> = ({
  loading,
  sessions,
}) => {
  if (loading) return <Loader />;
  if (sessions.length === 0) return null;
  return (
    <Stack spacing={1}>
      {sessions.map((session) => (
        <Session session={session} key={session.id} />
      ))}
    </Stack>
  );
};
