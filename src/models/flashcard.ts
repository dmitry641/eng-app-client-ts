import { IUserDeck } from "./deck";

export interface IUserCard {
  id: string;
  card: ICard;
  userDeckId: string;
  favorite: boolean;
  deleted: boolean;
  streak: number;
  stepBack: string;
  stepForward: string;
}

interface ICard {
  id: string;
  deckId: string;
  frontPrimary: string;
  frontSecondary: string;
  backPrimary: string;
  backSecondary: string;
}

export type LearnType = {
  userCardId: string;
  status: boolean;
};

export type LrnDelType = {
  userCard: IUserCard;
  userDeck?: IUserDeck;
};

export const cardsSettings = {
  showLearned: { value: () => true, label: "Show learned cards" },
  shuffleDecks: { value: () => true, label: "Shuffle decks" },
} as const;

type CardsSettings = {
  [P in keyof typeof cardsSettings]: ReturnType<
    (typeof cardsSettings)[P]["value"]
  >;
};

// const cardsSettingsTypes = ["showLearned", "shuffleDecks"] as const;
// const cardsSettingsLabels = ["Show learned cards", "Shuffle decks"];
// export const cardsSettingsDict = cardsSettingsTypes.map((el, idx) => ({
//   type: el,
//   label: cardsSettingsLabels[idx],
// }));

export type CardsSettingsType = keyof typeof cardsSettings;
export type CardsSettingsDTO = {
  type: CardsSettingsType;
  value: boolean;
};

export interface ICardsSettings extends CardsSettings {}

// const testArray = [
//   { key: "showLearned", value: () => true, label: "Show learned cards" },
//   { key: "shuffleDecks", value: () => "string", label: "Shuffle decks" },
// ] as const;
// // type qwe = {
// //   [P in (typeof testArray)[number]["key"]]: ReturnType<
// //     (typeof testArray)[number]["value"]
// //   >;
// // };
