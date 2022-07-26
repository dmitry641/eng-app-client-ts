import React from "react";
import { ITopic } from "../../models/topic";
import { Topic } from "./Topic";

export const TopicsList: React.FC = () => {
  const topics: ITopic[] = [{ id: "1" }, { id: "2" }];

  return (
    <div>
      <div>Topics:</div>
      <div>
        {topics.map((topic) => (
          <Topic topic={topic} key={topic.id} />
        ))}
      </div>
    </div>
  );
};
