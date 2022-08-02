export interface IUserDeck {
  id: string;
  deckId: string;
  dynamic: boolean;
  enabled: boolean;
  deleted: boolean;
  order: number;
  cardsCount: number;
  cardsLearned: number;
  deckName: string;
  canPublicIt: boolean;
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
  canBePublic: boolean;
  createdBy: string;
  totalCardsCount: number;
  author: string;
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
