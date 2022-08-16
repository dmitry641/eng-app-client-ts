import { IUserDeck } from "./deck";

export interface IUserCard {
  id: string;
  card: ICard;
  userDeckId: string;
  favorite: boolean;
  deleted: boolean;
}

interface ICard {
  id: string;
  deckId: string;
  customId?: string;
  frontPrimary: string;
  frontSecondary: string;
  backPrimary: string;
  backSecondary: string;
}

export type LearnType = {
  userCardId: string;
  status: StatusEnum;
};
export enum StatusEnum {
  easy = "easy",
  medium = "medium",
  hard = "hard",
}

export type LrnDelType = {
  userCard: IUserCard;
  userDeck?: IUserDeck;
};

export interface ICardsSettings {
  dynamicHighPriority: boolean;
  showLearned: boolean;
  shuffleDecks: boolean;
  frontSideFirst: boolean;
  randomSideFirst: boolean;
}

export enum UpdateTypeEnum {
  dynamicHighPriority = "dynamicHighPriority",
  showLearned = "showLearned",
  shuffleDecks = "shuffleDecks",
  frontSideFirst = "frontSideFirst",
  randomSideFirst = "randomSideFirst",
}
export type UpdateType = {
  type: UpdateTypeEnum;
  value: boolean;
};

const labels = [
  "High priority for the dynamic deck",
  "showLearned",
  "shuffleDecks",
  "frontSideFirst",
  "randomSideFirst",
];
export const settingsArray = Object.values(UpdateTypeEnum).map((el, i) => {
  return { type: el, label: labels[i] };
});
