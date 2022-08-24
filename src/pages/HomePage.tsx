import { AccountCircle, Store } from "@mui/icons-material";
import { Container, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MainContainer } from "../components/misc/MainContainer";
import { MyPaper } from "../components/misc/MyPaper";
import { RoutesEnum } from "../routes";
import { HeaderTitleEnum } from "../utils";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="md" sx={{ pt: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <IconButton color="inherit" aria-label="Shop">
            <Store sx={{ fontSize: "4.5rem" }} />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Account"
            onClick={() => navigate(RoutesEnum.ACCOUNT)}
          >
            <AccountCircle sx={{ fontSize: "4.5rem" }} />
          </IconButton>
        </Stack>
      </Container>
      <MainContainer maxWidth="sm">
        <Stack
          spacing={3}
          sx={{
            py: 2,
            "& .MuiPaper-root": { py: 5, cursor: "pointer" },
          }}
        >
          <MyPaper onClick={() => navigate(RoutesEnum.FLASHCARDS)}>
            <Typography variant="h4" align="center">
              {HeaderTitleEnum.flashcards}
            </Typography>
          </MyPaper>
          <MyPaper onClick={() => navigate(RoutesEnum.QUIZ)}>
            <Typography variant="h4" align="center">
              {HeaderTitleEnum.quiz}
            </Typography>
          </MyPaper>
          <MyPaper onClick={() => navigate(RoutesEnum.DECKS)}>
            <Typography variant="h4" align="center">
              {HeaderTitleEnum.decks}
            </Typography>
          </MyPaper>
        </Stack>
      </MainContainer>
    </>
  );
};
