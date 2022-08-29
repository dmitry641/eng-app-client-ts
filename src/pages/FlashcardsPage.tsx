import { Box } from "@mui/material";
import React from "react";
import { FlashcardsComponent } from "../components/flashcards/FlashcardsComponent";
import { Header } from "../components/misc/Header";
import { RoutesEnum } from "../routes";
import { HeaderTitleEnum } from "../utils";

export const FlashcardsPage: React.FC = () => {
  return (
    <>
      <Header
        backRoute={RoutesEnum.HOME}
        title={HeaderTitleEnum.flashcards}
        nextRoute={RoutesEnum.FLASHCARDS_SETTINGS}
      />
      <Box
        width="90wh"
        height="90vh"
        display="flex"
        justifyContent="center"
        sx={{ alignItems: { xs: "center", sm: "flex-start" } }}
        p={3}
      >
        <FlashcardsComponent />
      </Box>
    </>
  );
};
