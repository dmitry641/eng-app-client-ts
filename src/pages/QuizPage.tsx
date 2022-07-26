import React from "react";
import { Header } from "../components/misc/Header";
import { MainContainer } from "../components/misc/MainContainer";
import { Quiz } from "../components/quiz/Quiz";
import { RoutesEnum } from "../routes";
import { HeaderTitleEnum } from "../utils";

export const QuizPage: React.FC = () => {
  return (
    <>
      <Header
        backRoute={RoutesEnum.HOME}
        title={HeaderTitleEnum.quiz}
        nextRoute={RoutesEnum.QUIZ_SETTINGS}
      />
      <MainContainer>
        <Quiz />
      </MainContainer>
    </>
  );
};
