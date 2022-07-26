import type * as CSS from "csstype";
import React, { PropsWithChildren } from "react";

interface MainContainerProps extends PropsWithChildren {
  maxWidth?: CSS.Property.MaxWidth; // FIXME
  mt?: CSS.Property.MarginTop;
  mb?: CSS.Property.MarginBottom;
}

export const MainContainer: React.FC<MainContainerProps> = ({
  children,
  maxWidth = "lg",
  mt = 2,
  mb = 2,
}) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};
