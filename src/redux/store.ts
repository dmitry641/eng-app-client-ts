import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cardsAPI } from "../service/cardsApi";
import { decksAPI } from "../service/decksApi";
import { quizAPI } from "../service/quizApi";
import { rtkErrorMiddleware } from "./middleware/error-catching";
import { appReducer } from "./reducers/AppSlice";
import { userReducer } from "./reducers/UserSlice";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  [decksAPI.reducerPath]: decksAPI.reducer,
  [cardsAPI.reducerPath]: cardsAPI.reducer,
  [quizAPI.reducerPath]: quizAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) =>
    gDM().concat(
      rtkErrorMiddleware,
      decksAPI.middleware,
      cardsAPI.middleware,
      quizAPI.middleware
    ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootDispatch = typeof store.dispatch;
