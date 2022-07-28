import React from "react";
import { useSessions } from "../../hooks/useSessions";
import { SessionsList } from "./SessionsList";

export const SessionComponent: React.FC = () => {
  const { disabled, getSessions, loading, resetSessions, sessions, showList } =
    useSessions();

  return (
    <div>
      <div>Sessions:</div>
      <div>
        {!showList ? (
          <button disabled={disabled} onClick={getSessions}>
            Get sessions
          </button>
        ) : (
          <button disabled={disabled} onClick={resetSessions}>
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
