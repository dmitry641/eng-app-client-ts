import { ReactNode } from "react";
import { AccountPage } from "../pages/AccountPage";
import { DecksPage } from "../pages/DecksPage";
import { DecksSettingsPage } from "../pages/DecksSettingsPage";
import { FlashcardsPage } from "../pages/FlashcardsPage";
import { FlashcardsSettingsPage } from "../pages/FlashcardsSettingsPage";
import { HomePage } from "../pages/HomePage";
import { QuizPage } from "../pages/QuizPage";
import { QuizSettingsPage } from "../pages/QuizSettingsPage";
import { SingInPage } from "../pages/SingInPage";
import { SingUpPage } from "../pages/SingUpPage";

export enum RoutesEnum {
  SINGIN = "/singin",
  SINGUP = "/singup",
  HOME = "/",
  ACCOUNT = "/account",

  FLASHCARDS = "/flashcards",
  FLASHCARDS_SETTINGS = "/flashcards/settings",

  DECKS = "/decks",
  DECKS_SETTINGS = "/decks/settings",

  QUIZ = "/quiz",
  QUIZ_SETTINGS = "/quiz/settings",
}

interface IRoute {
  path: string;
  element: ReactNode;
}

export const publicRoutes: IRoute[] = [
  {
    path: RoutesEnum.SINGIN,
    element: <SingInPage />,
  },
  {
    path: RoutesEnum.SINGUP,
    element: <SingUpPage />,
  },
];

export const privateRoutes: IRoute[] = [
  {
    path: RoutesEnum.HOME,
    element: <HomePage />,
  },
  {
    path: RoutesEnum.ACCOUNT,
    element: <AccountPage />,
  },
  {
    path: RoutesEnum.FLASHCARDS,
    element: <FlashcardsPage />,
  },
  {
    path: RoutesEnum.FLASHCARDS_SETTINGS,
    element: <FlashcardsSettingsPage />,
  },
  {
    path: RoutesEnum.DECKS,
    element: <DecksPage />,
  },
  {
    path: RoutesEnum.DECKS_SETTINGS,
    element: <DecksSettingsPage />,
  },
  {
    path: RoutesEnum.QUIZ,
    element: <QuizPage />,
  },
  {
    path: RoutesEnum.QUIZ_SETTINGS,
    element: <QuizSettingsPage />,
  },
];
