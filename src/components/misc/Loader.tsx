import { Property } from "csstype";
import React from "react";

interface LoaderProps {
  alignItems?: Property.AlignItems;
  justifyContent?: Property.JustifyContent;
  p?: Property.Padding;
}

export const Loader: React.FC<LoaderProps> = ({
  alignItems = "center",
  justifyContent = "center",
  p = 3,
}) => {
  return <div>Loading...</div>;
};
