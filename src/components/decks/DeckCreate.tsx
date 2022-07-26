import React from "react";

export const DeckCreate: React.FC = () => {
  return (
    <div>
      <div>Filetype: csv</div>
      <div>
        Format: frontPrimary, frontSecondary?, backPrimary, backSecondary?
      </div>
      <div>
        <button>Add deck</button>
      </div>
    </div>
  );
};
