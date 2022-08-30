export interface ISession {
  id: string;
  userAgent: string;
  ip: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IUserSettings {
  darkMode: boolean;
}

export type UserResponseType = {
  user: IUser;
  settings: IUserSettings;
};

export interface SignInInput {
  email: string;
  password: string;
  reToken: string;
}
export interface SignUpInput extends SignInInput {
  name: string;
  darkMode: boolean;
}

export enum UpdUserSettingsEnum {
  darkMode = "darkMode",
}
export type UpdUserSettingsType = {
  type: UpdUserSettingsEnum;
  value: boolean;
};

export interface IStatistic {
  moduleName: "quiz" | "flashcards";
  stats: {
    today: number;
    average: number;
    total: number;
  };
}
