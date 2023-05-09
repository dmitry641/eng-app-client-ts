import { IUser } from "./user";

export interface IUserDeck {
  id: string;
  deck: IDeck;
  enabled: boolean;
  deleted: boolean;
  order: number;
  cardsCount: number;
  cardsLearned: number;
  canPublish: boolean;
  published: boolean;
}

export interface MoveUserDeck {
  userDeckId: string;
  position: "up" | "down";
}

export interface IDeck {
  id: string;
  name: string;
  public: boolean;
  createdBy: Omit<IUser, "email">;
  totalCardsCount: number;
}
