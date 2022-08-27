import { Stack, Typography } from "@mui/material";
import React from "react";
import { quizAPI } from "../../service/quizApi";
import { Loader } from "../misc/Loader";
import { Topic } from "./Topic";

export const TopicsList: React.FC = () => {
  const { data: topics = [], isLoading } = quizAPI.useGetTopicsQuery();

  if (isLoading) return <Loader />;
  if (!topics.length) return null;
  return (
    <>
      <Typography variant="body1">Available topics:</Typography>
      <Stack flexWrap="wrap" direction="row">
        {topics.map((topic) => (
          <Topic topic={topic} key={topic.id} />
        ))}
      </Stack>
    </>
  );
};
