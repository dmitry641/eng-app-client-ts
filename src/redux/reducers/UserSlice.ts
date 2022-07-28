import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserSettings } from "../../models/user";
import { LS_KEY } from "../../utils";

interface UserState {
  isAuth: boolean;
  error: string;
  user: IUser;
  settings: IUserSettings;
}

const initialState: UserState = {
  isAuth: false,
  error: "",
  user: {} as IUser,
  settings: {} as IUserSettings,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isAuth = true;
      localStorage.setItem(LS_KEY, JSON.stringify(action.payload.id));
    },
    setSettings(state, action: PayloadAction<IUserSettings>) {
      state.settings = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    reset() {
      localStorage.removeItem(LS_KEY);
      return initialState;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
