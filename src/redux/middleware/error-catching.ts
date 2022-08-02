import {
  Action,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { BaseQueryError } from "../../utils";

export const rtkErrorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action: Action) => {
    if (isRejectedWithValue(action)) {
      const err = action.payload as BaseQueryError;
      const msg = err.data?.message || "Error";
      console.log(msg);
      alert(msg);
      // api.dispatch(appNewToast...)
    }

    return next(action);
  };
