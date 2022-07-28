import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoutesEnum } from "../../routes";

interface AppState {
  loading: null | boolean;
  redirect: null | RoutesEnum;
}

const initialState: AppState = {
  loading: null,
  redirect: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setRedirect(state, action: PayloadAction<AppState["redirect"]>) {
      state.redirect = action.payload;
    },
    reset: () => initialState,
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
