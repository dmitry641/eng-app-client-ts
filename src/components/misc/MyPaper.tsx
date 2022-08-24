import { Paper, PaperTypeMap } from "@mui/material";
import React, { useState } from "react";

type PaperType = PaperTypeMap["props"];
interface MyPaperProps extends PaperType {
  onClick?: () => void;
  start?: number;
  finish?: number;
}
export const MyPaper: React.FC<MyPaperProps> = ({
  start = 2,
  finish = 6,
  ...rest
}) => {
  const [elevation, setElevation] = useState(start);
  const onMouseOver = () => setElevation(finish);
  const onMouseOut = () => setElevation(start);
  return (
    <Paper
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      elevation={elevation}
      {...rest}
    />
  );
};
