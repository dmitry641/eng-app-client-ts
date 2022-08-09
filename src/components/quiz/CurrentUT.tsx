import React from "react";

import { IQuestion, IUserTopic } from "../../models/quiz";
import { quizAPI } from "../../service/quizApi";

interface CurrentUTProps {
  currentUT: IUserTopic;
  question: IQuestion;
  isFetching: boolean;
}

export const CurrentUT: React.FC<CurrentUTProps> = ({
  currentUT,
  question,
  isFetching,
}) => {
  const [learn, { isLoading }] = quizAPI.useLearnMutation();
  const btnLoading = isLoading || isFetching;

  const nextHandler = () => {
    learn(question.id);
  };

  return (
    <div>
      <div>{currentUT.topicName}</div>
      <div>{question.text}</div>
      <div>Image</div>
      <div>
        <button disabled={btnLoading} onClick={nextHandler}>
          Next
        </button>
      </div>
    </div>
  );
};
