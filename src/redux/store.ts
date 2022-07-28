import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./reducers/AppSlice";
import { userReducer } from "./reducers/UserSlice";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootDispatch = typeof store.dispatch;
