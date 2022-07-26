import React from "react";
import { ITopic } from "../../models/topic";

interface TopicProps {
  topic: ITopic;
}

export const Topic: React.FC<TopicProps> = ({ topic }) => {
  return (
    <div>
      <p>Topic id - {topic.id}</p>
    </div>
  );
};
