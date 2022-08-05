import { useEffect, useState } from "react";
import { cardsAPI } from "../service/cardsApi";

export const useSide = () => {
  const { data: settings } = cardsAPI.useGetSettingsQuery();
  const [frontSide, setFrontSide] = useState(true);

  useEffect(() => {
    if (settings?.randomSideFirst) {
      if (Math.random() > 0.5) {
        setFrontSide(true);
      } else {
        setFrontSide(false);
      }
    } else {
      if (settings?.frontSideFirst) {
        setFrontSide(true);
      } else {
        setFrontSide(false);
      }
    }
  }, [settings?.frontSideFirst, settings?.randomSideFirst]);

  const switchSide = () => {
    setFrontSide((prev) => !prev);
  };

  return [frontSide, switchSide] as const;
};
