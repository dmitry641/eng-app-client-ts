import React from "react";
import { quizAPI } from "../../service/quizApi";
import { Loader } from "../misc/Loader";
import { Topic } from "./Topic";

export const TopicsList: React.FC = () => {
  const { data: topics, isLoading } = quizAPI.useGetTopicsQuery();

  if (isLoading) return <Loader />;
  if (!topics) return null;
  return (
    <div>
      <div>Available topics:</div>
      <div>
        {topics.map((topic) => (
          <Topic topic={topic} key={topic.id} />
        ))}
      </div>
    </div>
  );
};
