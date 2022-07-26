import React, { useState } from "react";
import { SessionsList } from "./SessionsList";

export const SessionComponent: React.FC = () => {
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessions] = useState([]);
  const [disabled, setDisabled] = useState(false);

  // FIXME custom hook?
  const getSessions = async () => {
    try {
      setDisabled(true);
      setShowList(true);
      setLoading(true);
      // const res = await UserService.sessions();
      // setSessions(res.data);
      // setLoading(false);
      // await sleep(SLEEP_TIMEOUTS.short);
      // setDisabled(false);
    } catch (error) {
      console.log(error);
    }
  };

  const resetSessionsHandler = async () => {
    try {
      // await UserService.sessionsReset();
      // dispatch(userStateReset());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>Sessions:</div>
      <div>
        {!showList ? (
          <button disabled={disabled} onClick={getSessions}>
            Get sessions
          </button>
        ) : (
          <button disabled={disabled} onClick={resetSessionsHandler}>
            Reset sessions
          </button>
        )}
      </div>
      <div>
        <SessionsList loading={loading} sessions={sessions}></SessionsList>
      </div>
    </div>
  );
};
