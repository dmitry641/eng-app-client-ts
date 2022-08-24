import { Box, CircularProgress } from "@mui/material";
import { Property } from "csstype";
import React from "react";

interface LoaderProps {
  alignItems?: Property.AlignItems;
  justifyContent?: Property.JustifyContent;
  p?: Property.Padding;
}

export const Loader: React.FC<LoaderProps> = ({
  alignItems = "center",
  justifyContent = "center",
  p = 3,
}) => {
  return (
    <Box
      p={p}
      display="flex"
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      <CircularProgress />
    </Box>
  );
};
