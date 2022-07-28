import { useDispatch } from "react-redux";
import { RootDispatch } from "../redux/store";

export const useAppDispatch: () => RootDispatch = useDispatch;
