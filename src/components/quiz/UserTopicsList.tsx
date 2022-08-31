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
  const {
    data: cUT,
    isLoading: cUTL,
    isFetching: cUTF,
  } = quizAPI.useINITQuery();
  const {
    data: userTopics = [],
    isLoading: utL,
    isFetching: utF,
  } = quizAPI.useGetUserTopicsQuery(undefined, { skip: !cUT });
  const loading = utL || cUTL;
  const fetching = utF || cUTF;

  const started = userTopics.filter((ut) => ut.status === UTStatus.started);
  const paused = userTopics.filter((ut) => ut.status === UTStatus.paused);
  const blocked = userTopics.filter((ut) => ut.status === UTStatus.blocked);
  const finished = userTopics.filter((ut) => ut.status === UTStatus.finished);

  const wrapped: UTWrapperProps[] = [
    { title: "Started", array: started },
    { title: "Paused", array: paused },
    { title: "Blocked", array: blocked },
    { title: "Finished", array: finished },
  ];

  if (loading || fetching) return <Loader />;
  if (!userTopics.length) return null;
  return (
    <div>
      {wrapped.map((el) => (
        <UserTopicWrapper key={el.title} title={el.title} array={el.array} />
      ))}
    </div>
  );
};

interface UTWrapperProps {
  title: string;
  array: IUserTopic[];
}
const UserTopicWrapper: React.FC<UTWrapperProps> = ({ array, title }) => {
  const [expanded, setExpanded] = useState(() => false);
  if (!array.length) return null;
  return (
    <Box mt={2}>
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
