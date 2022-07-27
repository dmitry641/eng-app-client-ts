import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoutesEnum } from "../../routes";

interface AppState {
  loading: boolean;
  redirect: null | RoutesEnum;
}

const initialState: AppState = {
  loading: true,
  redirect: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appSetLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    appSetRedirect(state, action: PayloadAction<AppState["redirect"]>) {
      state.redirect = action.payload;
    },
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
