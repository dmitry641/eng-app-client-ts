import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { IQuestion, IUserTopic } from "../../models/quiz";
import { quizAPI } from "../../service/quizApi";
import { Gallery } from "./Gallery";

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
    <Stack spacing={2}>
      <Typography align="center" variant="body2" color="textSecondary">
        {currentUT.topicName}
      </Typography>

      <Typography align="center" variant="h6">
        {question.text}
      </Typography>

      <Gallery topicName={currentUT.topicName} />

      <Button variant="contained" disabled={btnLoading} onClick={nextHandler}>
        Next
      </Button>
    </Stack>
  );
};
