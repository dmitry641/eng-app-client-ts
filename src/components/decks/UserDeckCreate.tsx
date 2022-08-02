import React, { useRef } from "react";
import { decksAPI } from "../../service/decksApi";

export const UserDeckCreate: React.FC = () => {
  const [create, { isLoading }] = decksAPI.useCreateMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clickHandler = () => {
    fileInputRef?.current?.click();
  };

  const createHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) throw new Error();
    const formData = new FormData();
    formData.append("csv", file);
    create(formData);
  };

  return (
    <div>
      <div>Filetype: csv</div>
      <div>
        Format: frontPrimary, frontSecondary?, backPrimary, backSecondary?
      </div>
      <div>
        <button disabled={isLoading} onClick={clickHandler}>
          Create deck
        </button>
        <input
          onChange={createHandler}
          multiple={false}
          ref={fileInputRef}
          type="file"
          hidden
        />
      </div>
    </div>
  );
};
