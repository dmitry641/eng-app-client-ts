import React, { ChangeEvent, useState } from "react";
import { IDecksSettings, SyncData, SyncTypeEnum } from "../../models/deck";
import { cardsAPI } from "../../service/cardsApi";
import { decksAPI } from "../../service/decksApi";
import { Loader } from "../misc/Loader";

export const DeckSettings: React.FC = () => {
  const { data: settings, isLoading } = decksAPI.useGetSettingsQuery();

  if (isLoading) return <Loader />;
  if (!settings) return null;
  if (!settings.dynamicSyncType) return <FirstState settings={settings} />;
  return <ThirdState settings={settings} />;
};

interface SettingsProps {
  settings: IDecksSettings;
}

const FirstState: React.FC<SettingsProps> = ({ settings }) => {
  const { isFetching } = decksAPI.useGetSettingsQuery();
  const [create, { isLoading }] = decksAPI.useCreateDynamicMutation();
  const [second, setSecond] = useState(false);
  const btnLoading = isLoading;

  const stateToTrue = () => setSecond(true);
  const stateToFalse = () => setSecond(false);

  const createHandler = async () => {
    try {
      if (!settings.dynamicCreated) {
        await create().unwrap();
      }
      stateToTrue();
    } catch (error) {}
  };

  if (isFetching) return <Loader />;
  if (second) return <SecondState backToPrevState={stateToFalse} />;
  return (
    <>
      <p>Not synced with the dynamic deck yet.</p>
      <button disabled={btnLoading} onClick={createHandler}>
        {settings.dynamicCreated ? "Choose sync type" : "Create dynamic deck"}
      </button>
    </>
  );
};

interface SecondStateProps {
  backToPrevState: () => void;
}
const SecondState: React.FC<SecondStateProps> = ({ backToPrevState }) => {
  const [update, { isLoading }] = decksAPI.useUpdateSyncDataMutation();
  const [type, setType] = useState<SyncTypeEnum>();
  const [link, setLink] = useState<string>();

  const radioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value as SyncTypeEnum);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await update({ type, link } as SyncData).unwrap();
      backToPrevState();
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>Sync with...</div>
        <div>
          <input
            disabled={isLoading}
            type="radio"
            id="yandex"
            name="type"
            value={SyncTypeEnum.yandex}
            onChange={radioHandler}
          />
          <label htmlFor="yandex">Yandex</label>
        </div>
        <div>
          <input
            disabled={isLoading}
            type="radio"
            id="reverso"
            name="type"
            value={SyncTypeEnum.reverso}
            onChange={radioHandler}
          />
          <label htmlFor="reverso">Reverso</label>
        </div>

        <LinkComponent
          type={type}
          onChange={changeHandler}
          isLoading={isLoading}
        />

        <div>
          {type && link && (
            <button disabled={isLoading} type="submit">
              Save
            </button>
          )}
          <button disabled={isLoading} onClick={backToPrevState}>
            Back
          </button>
        </div>
      </form>
    </>
  );
};

const ThirdState: React.FC<SettingsProps> = ({ settings }) => {
  const { refetch: refetchCards } = cardsAPI.useGetCardsQuery();
  const { isFetching } = decksAPI.useGetSettingsQuery();
  const [update, { isLoading: asL }] = decksAPI.useUpdateAutoSyncMutation();
  const [sync, { isLoading: sL }] = decksAPI.useSyncMutation();
  const [second, setSecond] = useState(false);
  const btnLoading = isFetching || asL || sL;

  const stateToTrue = () => setSecond(true);
  const stateToFalse = () => setSecond(false);

  const autoSyncHandler = (e: ChangeEvent<HTMLInputElement>) => {
    update(e.target.checked);
  };

  const syncNow = async () => {
    try {
      await sync().unwrap();
      refetchCards();
    } catch (error) {}
  };

  if (second) return <SecondState backToPrevState={stateToFalse} />;
  return (
    <>
      <p>Synced with the dynamic deck.</p>
      <p>Sync type: {settings.dynamicSyncType}</p>
      <p>Sync link: {settings.dynamicSyncLink}</p>
      <div>
        <button disabled={btnLoading} onClick={stateToTrue}>
          Change
        </button>
      </div>
      <br />
      <div>
        <input
          disabled={btnLoading}
          type="checkbox"
          name="autoSync"
          id="autoSync"
          checked={settings.dynamicAutoSync}
          onChange={autoSyncHandler}
        />
        <label htmlFor="autoSync">Auto sync</label>
      </div>
      <br />
      <div>
        <button onClick={syncNow} disabled={btnLoading}>
          Sync
        </button>
        {settings.dynamicSyncMessage && (
          <span>{settings.dynamicSyncMessage}</span>
        )}
      </div>
    </>
  );
};

interface LinkProps {
  type: SyncTypeEnum | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}
const LinkComponent: React.FC<LinkProps> = ({ type, onChange, isLoading }) => {
  if (!type) return null;

  const hint =
    type === SyncTypeEnum.yandex
      ? "https://translate.yandex.ru/subscribe?collection_id=5b84234c898789001f7fea81"
      : "https://context.reverso.net/favourites/accountname";

  return (
    <>
      <div>
        <div>Link: </div>
        <input
          disabled={isLoading}
          type="text"
          name="link"
          onChange={onChange}
        />
      </div>
      <div>Example: {hint}</div>
    </>
  );
};
