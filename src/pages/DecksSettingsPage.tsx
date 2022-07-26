import React from "react";
import { DeckSettings } from "../components/decks/DecksSettings";
import { Header } from "../components/misc/Header";
import { MainContainer } from "../components/misc/MainContainer";
import { RoutesEnum } from "../routes";
import { HeaderTitleEnum } from "../utils";

export const DecksSettingsPage: React.FC = () => {
  return (
    <>
      <Header
        backRoute={RoutesEnum.DECKS}
        title={HeaderTitleEnum.decksSettings}
      />
      <MainContainer>
        <DeckSettings />
      </MainContainer>
    </>
  );
};
