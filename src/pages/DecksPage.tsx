import React from "react";
import { DecksList } from "../components/decks/DecksList";
import { UserDeckCreate } from "../components/decks/UserDeckCreate";
import { UserDecksList } from "../components/decks/UserDecksList";
import { Header } from "../components/misc/Header";
import { MainContainer } from "../components/misc/MainContainer";
import { RoutesEnum } from "../routes";
import { HeaderTitleEnum } from "../utils";

export const DecksPage: React.FC = () => {
  return (
    <>
      <Header
        backRoute={RoutesEnum.HOME}
        title={HeaderTitleEnum.decks}
        nextRoute={RoutesEnum.DECKS_SETTINGS}
      />
      <MainContainer>
        <UserDeckCreate />
        <UserDecksList />
        <DecksList />
      </MainContainer>
    </>
  );
};
