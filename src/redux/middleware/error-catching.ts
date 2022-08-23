import {
  Action,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { BaseQueryError } from "../../utils";

export const rtkErrorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action: Action) => {
    if (isRejectedWithValue(action)) {
      const err = action.payload as BaseQueryError;
      if (err.data?.status === 401) return;
      const msg = err.data?.message || "Error";
      toast(msg);
    }

    return next(action);
  };
