import { IUser } from "./user";

export interface IUserDeck {
  id: string;
  deck: IDeck;
  dynamic: boolean;
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

export enum SyncTypeEnum {
  reverso = "reverso",
  yandex = "yandex",
}

export type SyncData = {
  type: SyncTypeEnum;
  link: string;
};

export interface IDecksSettings {
  dynamicSyncType?: SyncTypeEnum;
  dynamicSyncLink?: string;
  dynamicAutoSync: boolean;
  dynamicSyncMessage?: string;
  dynamicCreated: boolean;
}

export type DeckSetResponse = { userDeck: IUserDeck; settings: IDecksSettings };
