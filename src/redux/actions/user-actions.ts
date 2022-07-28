import { SignInInput, SignUpInput } from "../../models/user";
import { userService } from "../../service/UserService";
import { errorHandler, errorMsgGenerator, sleep, TIMEOUTS } from "../../utils";
import { appActions } from "../reducers/AppSlice";
import { userActions } from "../reducers/UserSlice";
import { RootDispatch } from "../store";
import { appResetAll } from "./app-actions";

export function userInit() {
  return async (dispatch: RootDispatch) => {
    try {
      const res = await userService.getUser();
      dispatch(userActions.setUser(res.data.user));
      dispatch(userActions.setSettings(res.data.settings));
      dispatch(appActions.setLoading(false));
    } catch (error) {
      errorHandler(error);
    }
  };
}

export function userSignIn(signInInput: SignInInput) {
  return async (dispatch: RootDispatch) => {
    try {
      const res = await userService.signIn(signInInput);
      dispatch(userActions.setUser(res.data.user));
      dispatch(userActions.setSettings(res.data.settings));
    } catch (error) {
      const msg = errorMsgGenerator(error);
      dispatch(userSetError(msg));
      errorHandler(error);
    }
  };
}

export function userSignUp(signUpInput: SignUpInput) {
  return async (dispatch: RootDispatch) => {
    try {
      const res = await userService.signUp(signUpInput);
      dispatch(userActions.setUser(res.data.user));
      dispatch(userActions.setSettings(res.data.settings));
    } catch (error) {
      const msg = errorMsgGenerator(error);
      dispatch(userSetError(msg));
      errorHandler(error);
    }
  };
}

export function userLogout() {
  return async (dispatch: RootDispatch) => {
    try {
      await userService.logout();
      dispatch(appResetAll());
    } catch (error) {
      errorHandler(error);
    }
  };
}

export function userSetError(msg: string) {
  return async (dispatch: RootDispatch) => {
    dispatch(userActions.setError(msg));
    await sleep(TIMEOUTS.xl);
    dispatch(userActions.setError(""));
  };
}
