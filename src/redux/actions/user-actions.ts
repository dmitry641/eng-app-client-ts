import {
  SignInInput,
  SignUpInput,
  UpdUserSettingsType,
} from "../../models/user";
import { UserService } from "../../service/UserService";
import { errorHandler, errorMsgGenerator, sleep, TIMEOUTS } from "../../utils";
import { appActions } from "../reducers/AppSlice";
import { userActions } from "../reducers/UserSlice";
import { RootDispatch } from "../store";
import { appResetAll } from "./app-actions";

export function userInit() {
  return async (dispatch: RootDispatch) => {
    try {
      const res = await UserService.getUser();
      dispatch(userActions.setUser(res.data.user));
      dispatch(userActions.setSettings(res.data.settings));
    } catch (error) {
      errorHandler(error);
    } finally {
      dispatch(appActions.setLoading(false));
    }
  };
}

export function userSignIn(signInInput: SignInInput) {
  return async (dispatch: RootDispatch) => {
    try {
      const res = await UserService.signIn(signInInput);
      dispatch(userActions.setUser(res.data.user));
      dispatch(userActions.setSettings(res.data.settings));
    } catch (error) {
      const msg = errorMsgGenerator(error);
      dispatch(userSetError(msg));
    }
  };
}

export function userSignUp(signUpInput: SignUpInput) {
  return async (dispatch: RootDispatch) => {
    try {
      const res = await UserService.signUp(signUpInput);
      dispatch(userActions.setUser(res.data.user));
      dispatch(userActions.setSettings(res.data.settings));
    } catch (error) {
      const msg = errorMsgGenerator(error);
      dispatch(userSetError(msg));
    }
  };
}

export function userLogout() {
  return async (dispatch: RootDispatch) => {
    try {
      await UserService.logout();
      dispatch(appResetAll());
    } catch (error) {
      errorHandler(error);
    }
  };
}

export function userUpdateSettings(obj: UpdUserSettingsType) {
  return async (dispatch: RootDispatch) => {
    try {
      dispatch(userActions.setBtnLoading(true));
      const res = await UserService.updateSettings(obj);
      dispatch(userActions.setSettings(res.data));
      dispatch(userActions.setBtnLoading(false));
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
