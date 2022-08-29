import { Stack } from "@mui/material";
import React from "react";
import { FavoritesList } from "../components/flashcards/FavoritesList";
import { FlashcardsSettings } from "../components/flashcards/FlashcardsSettings";
import { Header } from "../components/misc/Header";
import { MainContainer } from "../components/misc/MainContainer";
import { RoutesEnum } from "../routes";
import { HeaderTitleEnum } from "../utils";

export const FlashcardsSettingsPage: React.FC = () => {
  return (
    <>
      <Header
        backRoute={RoutesEnum.FLASHCARDS}
        title={HeaderTitleEnum.flashcardsSettings}
      />
      <MainContainer>
        <Stack spacing={2}>
          <FlashcardsSettings />
          <FavoritesList />
        </Stack>
      </MainContainer>
    </>
  );
};
