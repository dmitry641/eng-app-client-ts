import { useState } from "react";
import { ISession } from "../models/session";
import { appResetAll } from "../redux/actions/app-actions";
import { UserService } from "../service/UserService";
import { errorHandler, sleep, TIMEOUTS } from "../utils";
import { useAppDispatch } from "./useAppDispatch";

export const useSessions = () => {
  const dispatch = useAppDispatch();
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [disabled, setDisabled] = useState(false);

  const getSessions = async () => {
    try {
      setDisabled(true);
      setShowList(true);
      setLoading(true);
      const res = await UserService.getSessions();
      setSessions(res.data);
      setLoading(false);
      await sleep(TIMEOUTS.short);
      setDisabled(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  const resetSessions = async () => {
    try {
      await UserService.resetSessions();
      dispatch(appResetAll());
    } catch (error) {
      errorHandler(error);
    }
  };

  return { showList, loading, sessions, disabled, getSessions, resetSessions };
};
