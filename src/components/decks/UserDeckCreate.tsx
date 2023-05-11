import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import { decksAPI } from "../../service/decksApi";

export const UserDeckCreate: React.FC = () => {
  const [create, { isLoading }] = decksAPI.useCreateMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const btnLoading = isLoading;

  const clickHandler = () => {
    fileInputRef?.current?.click();
  };

  const createHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) throw new Error();
    const formData = new FormData();
    formData.append("csv", file);
    create(formData);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box>
        <Button
          variant="contained"
          disabled={btnLoading}
          onClick={clickHandler}
        >
          Create deck
        </Button>
        <input
          onChange={createHandler}
          multiple={false}
          ref={fileInputRef}
          type="file"
          hidden
        />
      </Box>

      <Box>
        <Typography variant="body2" color="text.secondary">
          Filetype: csv
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Format: frontPrimary, frontSecondary?, backPrimary, backSecondary
        </Typography>
      </Box>
    </Stack>
  );
};
