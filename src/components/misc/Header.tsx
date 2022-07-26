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
    <>
      <div>
        <button aria-label="Back" onClick={backHandler}>
          back
        </button>
        <span> {title} </span>
        {nextRoute && (
          <button aria-label="Settings" onClick={nextHandler}>
            settings
          </button>
        )}
      </div>
      <hr />
    </>
  );
};
