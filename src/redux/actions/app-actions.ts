import { enqueueSnackbar } from "notistack";
import { RoutesEnum } from "../../routes";
import { cardsAPI } from "../../service/cardsApi";
import { decksAPI } from "../../service/decksApi";
import { quizAPI } from "../../service/quizApi";
import { LS_KEY } from "../../utils";
import { appActions } from "../reducers/AppSlice";
import { userActions } from "../reducers/UserSlice";
import { RootDispatch } from "../store";
import { userInit } from "./user-actions";

export function appInit() {
  return (dispatch: RootDispatch) => {
    dispatch(appActions.setLoading(true));
    if (localStorage.getItem(LS_KEY)) {
      dispatch(userInit());
    } else {
      dispatch(appActions.setLoading(false));
    }
  };
}

export function appSetRedirectTo(route: RoutesEnum) {
  return (dispatch: RootDispatch) => {
    dispatch(appActions.setRedirect(route));
    setTimeout(() => {
      dispatch(appActions.setRedirect(null));
    });
  };
}

export function appResetAll() {
  return (dispatch: RootDispatch) => {
    dispatch(userActions.reset());
    dispatch(appActions.reset());
    dispatch(decksAPI.internalActions.resetApiState());
    dispatch(cardsAPI.internalActions.resetApiState());
    dispatch(quizAPI.internalActions.resetApiState());
    dispatch(appInit()); // ???
    enqueueSnackbar("Unauthorized...", { variant: "info" });
  };
}
