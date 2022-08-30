import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useSessions } from "../../hooks/useSessions";
import { SessionsList } from "./SessionsList";

export const SessionComponent: React.FC = () => {
  const { disabled, getSessions, loading, resetSessions, sessions, showList } =
    useSessions();

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="body1">Sessions</Typography>
        {!showList ? (
          <Button variant="outlined" disabled={disabled} onClick={getSessions}>
            Get
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="error"
            disabled={disabled}
            onClick={resetSessions}
          >
            Reset
          </Button>
        )}
      </Stack>

      <SessionsList loading={loading} sessions={sessions} />
    </>
  );
};
