import React from "react";
import { useNavigate } from "react-router-dom";
import { MainContainer } from "../components/misc/MainContainer";
import { RoutesEnum } from "../routes";
import { HeaderTitleEnum } from "../utils";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainContainer>
        <div>
          <button onClick={() => navigate(RoutesEnum.ACCOUNT)}>
            {HeaderTitleEnum.account}
          </button>
        </div>
        <div>
          <button onClick={() => navigate(RoutesEnum.FLASHCARDS)}>
            {HeaderTitleEnum.flashcards}
          </button>
        </div>
        <div>
          <button onClick={() => navigate(RoutesEnum.QUIZ)}>
            {HeaderTitleEnum.quiz}
          </button>
        </div>
        <div>
          <button onClick={() => navigate(RoutesEnum.DECKS)}>
            {HeaderTitleEnum.decks}
          </button>
        </div>
      </MainContainer>
    </>
  );
};
