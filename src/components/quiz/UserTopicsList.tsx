import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IUserTopic, UTStatus } from "../../models/quiz";
import { quizAPI } from "../../service/quizApi";
import { Loader } from "../misc/Loader";
import { UserTopic } from "./UserTopic";

export const UserTopicsList: React.FC = () => {
  const { data: userTopics = [], isLoading } = quizAPI.useGetUserTopicsQuery();
  const started = userTopics.filter((ut) => ut.status === UTStatus.started);
  const paused = userTopics.filter((ut) => ut.status === UTStatus.paused);
  const blocked = userTopics.filter((ut) => ut.status === UTStatus.blocked);
  const finished = userTopics.filter((ut) => ut.status === UTStatus.finished);

  const wrapped: UTWrapperProps[] = [
    { title: "Started", array: started, key: Math.random() },
    { title: "Paused", array: paused, key: Math.random() },
    { title: "Blocked", array: blocked, key: Math.random() },
    { title: "Finished", array: finished, key: Math.random() },
  ];

  if (isLoading) return <Loader />;
  if (!userTopics.length) return null;
  return <div>{wrapped.map(UserTopicWrapper)}</div>;
};

interface UTWrapperProps {
  title: string;
  array: IUserTopic[];
  key: number;
}

const UserTopicWrapper: React.FC<UTWrapperProps> = ({ array, title, key }) => {
  const [expanded, setExpanded] = useState(() => false);
  if (!array.length) return null;
  return (
    <Box key={key} mt={2}>
      <Accordion expanded={expanded} onChange={(e, v) => setExpanded(v)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <Stack flexWrap="wrap" direction="row">
            {array.map((userTopic) => (
              <UserTopic userTopic={userTopic} key={userTopic.id} />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
