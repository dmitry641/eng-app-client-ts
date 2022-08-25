import {
  Action,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { BaseQueryError } from "../../utils";

export const rtkErrorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action: Action) => {
    if (isRejectedWithValue(action)) {
      const err = action.payload as BaseQueryError;
      if (err.data?.status === 401) return;
      const msg = err.data?.message || "Error";
      enqueueSnackbar(msg, { variant: "error" });
    }

    return next(action);
  };
