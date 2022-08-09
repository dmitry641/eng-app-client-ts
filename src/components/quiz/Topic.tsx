import React from "react";
import { ITopic } from "../../models/quiz";
import { quizAPI } from "../../service/quizApi";

interface TopicProps {
  topic: ITopic;
}

export const Topic: React.FC<TopicProps> = ({ topic }) => {
  const [add, { isLoading }] = quizAPI.useAddTopicMutation();

  const addHandler = () => {
    !isLoading && add(topic.id);
  };

  return (
    <div
      style={{
        padding: "10px",
        margin: "10px",
        border: "1px solid black",
        display: "inline-block",
        cursor: "pointer",
        backgroundColor: `${isLoading ? "gray" : "none"}`,
      }}
      onClick={addHandler}
    >
      {topic.topicName}
    </div>
  );
};
