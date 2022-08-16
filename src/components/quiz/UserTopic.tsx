import React, { MouseEvent } from "react";
import { IUserTopic, UTStatus } from "../../models/quiz";
import { quizAPI } from "../../service/quizApi";

interface UserTopicProps {
  userTopic: IUserTopic;
}

export const UserTopic: React.FC<UserTopicProps> = ({ userTopic }) => {
  const [select, { isLoading: cL }] = quizAPI.useSelectMutation();
  const [block, { isLoading: bL }] = quizAPI.useBlockMutation();
  const btnLoading = cL || bL;
  const notAllowed =
    userTopic.status === UTStatus.blocked ||
    userTopic.status === UTStatus.finished;

  const selectHandler = () => {
    if (notAllowed) return;
    select(userTopic.id);
  };
  const blockHandler = (e: MouseEvent) => {
    e.stopPropagation();
    block(userTopic.id);
  };

  return (
    <div
      style={{
        padding: "10px",
        margin: "10px",
        border: "1px solid black",
        display: "inline-block",
        cursor: `${notAllowed ? "default" : "pointer"}`,
        backgroundColor: `${btnLoading ? "gray" : "none"}`,
      }}
      onClick={selectHandler}
    >
      <div>
        <div>Name: {userTopic.topicName}</div>
        <div>Status: {userTopic.status}</div>
        <button onClick={blockHandler}>block</button>
      </div>
    </div>
  );
};
