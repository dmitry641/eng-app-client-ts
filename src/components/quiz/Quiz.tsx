import React from "react";
import { quizAPI } from "../../service/quizApi";
import { Loader } from "../misc/Loader";
import { CurrentUT } from "./CurrentUT";

export const Quiz: React.FC = () => {
  const {
    data: currentUT,
    isLoading: ctL,
    isFetching: ctF,
  } = quizAPI.useINITQuery();
  const {
    data: questions,
    isLoading: qL,
    isFetching: qF,
  } = quizAPI.useGetQuestionsQuery(undefined, { skip: !currentUT });

  const loading = ctL || qL;
  const fetching = ctF || qF;

  if (loading) return <Loader />;
  if (!currentUT || !questions?.length) return null;
  return (
    <CurrentUT
      currentUT={currentUT}
      question={questions[0]}
      isFetching={fetching}
    />
  );
};
