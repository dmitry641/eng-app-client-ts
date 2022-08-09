import React, { MouseEvent } from "react";
import { IUserTopic, UTStatus } from "../../models/quiz";
import { quizAPI } from "../../service/quizApi";

interface UserTopicProps {
  userTopic: IUserTopic;
}

export const UserTopic: React.FC<UserTopicProps> = ({ userTopic }) => {
  const [change, { isLoading: cL }] = quizAPI.useChangeMutation();
  const [block, { isLoading: bL }] = quizAPI.useBlockMutation();
  const btnLoading = cL || bL;
  const isBlocked = userTopic.status === UTStatus.blocked;

  const changeHandler = () => {
    if (isBlocked) return;
    change(userTopic.id);
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
        cursor: `${isBlocked ? "default" : "pointer"}`,
        backgroundColor: `${btnLoading ? "gray" : "none"}`,
      }}
      onClick={changeHandler}
    >
      <div>
        <div>Name: {userTopic.topicName}</div>
        <div>Status: {userTopic.status}</div>
        <button onClick={blockHandler}>block</button>
      </div>
    </div>
  );
};
