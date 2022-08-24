import { ArrowBack, Settings } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../routes";
import { HeaderTitleEnum } from "../../utils";

interface HeaderProps {
  backRoute?: RoutesEnum;
  title: HeaderTitleEnum;
  nextRoute?: RoutesEnum;
}

export const Header: React.FC<HeaderProps> = ({
  backRoute,
  title,
  nextRoute,
}) => {
  const navigate = useNavigate();

  const backHandler = () => {
    if (backRoute) {
      return navigate(backRoute);
    }
    navigate(-1);
  };

  const nextHandler = () => {
    nextRoute && navigate(nextRoute);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton color="inherit" aria-label="Back" onClick={backHandler}>
            <ArrowBack />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>

          {nextRoute && (
            <IconButton
              color="inherit"
              aria-label="Settings"
              onClick={nextHandler}
            >
              <Settings />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
