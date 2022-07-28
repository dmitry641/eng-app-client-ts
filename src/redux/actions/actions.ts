import * as appActionCreators from "./app-actions";
import * as userActionCreators from "./user-actions";

export const actionCreators = {
  ...appActionCreators,
  ...userActionCreators,
};
