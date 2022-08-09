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
}
export interface SignUpInput extends SignInInput {
  name: string;
}

export enum UpdUserSettingsEnum {
  darkMode = "darkMode",
}
export type UpdUserSettingsType = {
  type: UpdUserSettingsEnum;
  value: boolean;
};
