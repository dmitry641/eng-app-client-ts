import { Box, Typography } from "@mui/material";
import React from "react";
import { ITopic } from "../../models/quiz";
import { quizAPI } from "../../service/quizApi";
import { MyPaper } from "../misc/MyPaper";

interface TopicProps {
  topic: ITopic;
}

export const Topic: React.FC<TopicProps> = ({ topic }) => {
  const [add, { isLoading }] = quizAPI.useAddTopicMutation();

  const addHandler = () => {
    !isLoading && add(topic.id);
  };

  return (
    <Box mr={2} mt={2}>
      <MyPaper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          cursor: isLoading ? "default" : "pointer",
          backgroundColor: isLoading ? "gray" : "none",
        }}
        onClick={addHandler}
      >
        <Typography noWrap>{topic.topicName}</Typography>
      </MyPaper>
    </Box>
  );
};
