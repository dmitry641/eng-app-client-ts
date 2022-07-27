import { RoutesEnum } from "../../routes";
import { appActions } from "../reducers/AppSlice";
import { AppDispatch } from "../store";

export function appSetRedirectTo(route: RoutesEnum) {
  return (dispatch: AppDispatch) => {
    dispatch(appActions.appSetRedirect(route));
    setTimeout(() => {
      dispatch(appActions.appSetRedirect(null));
    });
  };
}
