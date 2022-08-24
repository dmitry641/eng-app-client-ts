import { Box, Breakpoint, Container } from "@mui/material";
import type * as CSS from "csstype";
import React, { PropsWithChildren } from "react";

interface MainContainerProps extends PropsWithChildren {
  maxWidth?: Breakpoint;
  mt?: CSS.Property.MarginTop;
  mb?: CSS.Property.MarginBottom;
}

export const MainContainer: React.FC<MainContainerProps> = ({
  children,
  maxWidth = "lg",
  mt = 2,
  mb = 2,
}) => {
  return (
    <Box mt={mt} mb={mb}>
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
};
