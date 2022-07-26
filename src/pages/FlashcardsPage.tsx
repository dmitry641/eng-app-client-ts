import React from "react";
import { FlashcardsComponent } from "../components/flashcards/FlashcardsComponent";
import { Header } from "../components/misc/Header";
import { MainContainer } from "../components/misc/MainContainer";
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
      <MainContainer>
        <FlashcardsComponent />
      </MainContainer>
    </>
  );
};
