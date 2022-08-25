import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { SessionComponent } from "./SessionComponent";
import { Settings } from "./Settings";

export const Account: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const { userLogout } = useActions();

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Welcome, {user.name}!</Typography>
      <Typography>Email: {user.email}</Typography>

      <Settings />
      <SessionComponent />

      <Box>
        <Button variant="outlined" onClick={() => userLogout()}>
          Logout
        </Button>
      </Box>
    </Stack>
  );
};
