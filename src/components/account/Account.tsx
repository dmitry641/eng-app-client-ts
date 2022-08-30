import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { SessionComponent } from "./SessionComponent";
import { Settings } from "./Settings";
import { Statistic } from "./Statistic";

export const Account: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const { userLogout } = useActions();

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Welcome, {user.name}!</Typography>
      <Typography>Email: {user.email}</Typography>

      <Divider />
      <Settings />
      <Divider />
      <SessionComponent />
      <Divider />
      <Statistic />

      <Box>
        <Button color="error" variant="contained" onClick={userLogout}>
          Logout
        </Button>
      </Box>
    </Stack>
  );
};
