import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/actions/actions";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
