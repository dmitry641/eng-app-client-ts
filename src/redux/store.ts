import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { decksAPI } from "../service/decksApi";
import { rtkErrorMiddleware } from "./middleware/error-catching";
import { appReducer } from "./reducers/AppSlice";
import { userReducer } from "./reducers/UserSlice";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  [decksAPI.reducerPath]: decksAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) => gDM().concat(decksAPI.middleware, rtkErrorMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootDispatch = typeof store.dispatch;
