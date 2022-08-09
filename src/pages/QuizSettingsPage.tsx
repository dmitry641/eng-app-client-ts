import React from "react";
import { Header } from "../components/misc/Header";
import { MainContainer } from "../components/misc/MainContainer";
import { TopicsList } from "../components/quiz/TopicsList";
import { UserTopicsList } from "../components/quiz/UserTopicsList";
import { RoutesEnum } from "../routes";
import { HeaderTitleEnum } from "../utils";

export const QuizSettingsPage: React.FC = () => {
  return (
    <>
      <Header
        backRoute={RoutesEnum.QUIZ}
        title={HeaderTitleEnum.quizSettings}
      />
      <MainContainer>
        <TopicsList />
        <UserTopicsList />
      </MainContainer>
    </>
  );
};
