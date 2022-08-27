import { Block, SettingsBackupRestore } from "@mui/icons-material";
import {
  Badge,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { MouseEvent } from "react";
import { IUserTopic, UTStatus } from "../../models/quiz";
import { quizAPI } from "../../service/quizApi";
import { MyPaper } from "../misc/MyPaper";

interface UserTopicProps {
  userTopic: IUserTopic;
}

export const UserTopic: React.FC<UserTopicProps> = ({ userTopic }) => {
  const [select, { isLoading: cL }] = quizAPI.useSelectMutation();
  const [block, { isLoading: bL }] = quizAPI.useBlockMutation();
  const isBlocked = userTopic.status === UTStatus.blocked;
  const isFinished = userTopic.status === UTStatus.finished;
  const btnLoading = cL || bL;
  const notAllowed = isBlocked || isFinished;

  const selectHandler = () => {
    if (notAllowed || btnLoading) return;
    select(userTopic.id);
  };
  const blockHandler = (e: MouseEvent) => {
    e.stopPropagation();
    !btnLoading && block(userTopic.id);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      mr={2}
      mb={2}
    >
      <Box mr={!isFinished ? 1.5 : 0} mt={!isFinished ? 1.5 : 0}>
        <Badge
          badgeContent={
            !isFinished
              ? `${userTopic.learnedQuestions.length}/${userTopic.totalQuestionCount}`
              : 0
          }
          color="primary"
        >
          <MyPaper
            sx={{
              p: 2,
              cursor: notAllowed || btnLoading ? "default" : "pointer",
              backgroundColor: btnLoading ? "gray" : "none",
            }}
            onClick={selectHandler}
          >
            <Stack alignItems="center">
              <Typography noWrap>{userTopic.topicName}</Typography>

              {!isFinished && (
                <Box>
                  <Tooltip title={isBlocked ? "Unblock" : "Block"}>
                    <IconButton
                      onClick={blockHandler}
                      aria-label={isBlocked ? "unblock" : "block"}
                    >
                      {isBlocked ? (
                        <SettingsBackupRestore />
                      ) : (
                        <Block color="error" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Stack>
          </MyPaper>
        </Badge>
      </Box>
    </Box>
  );
};
