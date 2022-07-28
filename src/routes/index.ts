import { AccountPage } from "../pages/AccountPage";
import { DecksPage } from "../pages/DecksPage";
import { DecksSettingsPage } from "../pages/DecksSettingsPage";
import { FlashcardsPage } from "../pages/FlashcardsPage";
import { FlashcardsSettingsPage } from "../pages/FlashcardsSettingsPage";
import { HomePage } from "../pages/HomePage";
import { QuizPage } from "../pages/QuizPage";
import { QuizSettingsPage } from "../pages/QuizSettingsPage";
import { SignInPage } from "../pages/SignInPage";
import { SignUpPage } from "../pages/SignUpPage";

export enum RoutesEnum {
  SIGNIN = "/signin",
  SIGNUP = "/signup",
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
  Component: React.FC;
}

export const publicRoutes: IRoute[] = [
  {
    path: RoutesEnum.SIGNIN,
    Component: SignInPage,
  },
  {
    path: RoutesEnum.SIGNUP,
    Component: SignUpPage,
  },
];

export const privateRoutes: IRoute[] = [
  {
    path: RoutesEnum.HOME,
    Component: HomePage,
  },
  {
    path: RoutesEnum.ACCOUNT,
    Component: AccountPage,
  },
  {
    path: RoutesEnum.FLASHCARDS,
    Component: FlashcardsPage,
  },
  {
    path: RoutesEnum.FLASHCARDS_SETTINGS,
    Component: FlashcardsSettingsPage,
  },
  {
    path: RoutesEnum.DECKS,
    Component: DecksPage,
  },
  {
    path: RoutesEnum.DECKS_SETTINGS,
    Component: DecksSettingsPage,
  },
  {
    path: RoutesEnum.QUIZ,
    Component: QuizPage,
  },
  {
    path: RoutesEnum.QUIZ_SETTINGS,
    Component: QuizSettingsPage,
  },
];
