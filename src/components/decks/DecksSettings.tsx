import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { IDecksSettings, SyncData, SyncTypeEnum } from "../../models/deck";
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

  if (second) return <SecondState backToPrevState={stateToFalse} />;
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Not synced with the dynamic deck yet.
      </Typography>
      <Button variant="outlined" disabled={btnLoading} onClick={createHandler}>
        {settings.dynamicCreated ? "Choose sync type" : "Create dynamic deck"}
      </Button>
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
  const btnLoading = isLoading;

  const radioHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value as SyncTypeEnum);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await update({ type, link } as SyncData).unwrap();
      backToPrevState();
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Stack spacing={2}>
          <FormControl disabled={btnLoading} onChange={radioHandler}>
            <FormLabel>Sync with...</FormLabel>
            <RadioGroup>
              <FormControlLabel
                value={SyncTypeEnum.yandex}
                control={<Radio />}
                label={SyncTypeEnum.yandex}
              />
              <FormControlLabel
                value={SyncTypeEnum.reverso}
                control={<Radio />}
                label={SyncTypeEnum.reverso}
              />
            </RadioGroup>
          </FormControl>

          <LinkComponent
            type={type}
            onChange={changeHandler}
            btnLoading={btnLoading}
          />

          <Stack direction="row" spacing={2}>
            {type && link && (
              <Button variant="contained" disabled={btnLoading} type="submit">
                Save
              </Button>
            )}
            <Button
              variant="contained"
              color="error"
              disabled={btnLoading}
              onClick={backToPrevState}
            >
              Back
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
};

const ThirdState: React.FC<SettingsProps> = ({ settings }) => {
  const [update, { isLoading: asL }] = decksAPI.useUpdateAutoSyncMutation();
  const [sync, { isLoading: sL }] = decksAPI.useSyncMutation();
  const [second, setSecond] = useState(false);
  const btnLoading = asL || sL;

  const stateToTrue = () => setSecond(true);
  const stateToFalse = () => setSecond(false);

  const autoSyncHandler = (e: ChangeEvent<HTMLInputElement>) => {
    update(e.target.checked);
  };

  const syncNow = () => {
    sync();
  };

  if (second) return <SecondState backToPrevState={stateToFalse} />;
  return (
    <Stack spacing={1}>
      <Typography variant="h6">Synced with the dynamic deck.</Typography>
      <Divider />
      <Typography>Sync type: {settings.dynamicSyncType}</Typography>
      <Typography>Sync link: {settings.dynamicSyncLink}</Typography>
      <div>
        <Button variant="outlined" disabled={btnLoading} onClick={stateToTrue}>
          Change
        </Button>
      </div>

      <FormGroup>
        <FormControlLabel
          disabled={btnLoading}
          control={
            <Switch
              checked={settings.dynamicAutoSync}
              onChange={autoSyncHandler}
            />
          }
          label="Auto sync"
        />
      </FormGroup>

      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="contained" onClick={syncNow} disabled={btnLoading}>
          Sync
        </Button>
        {settings.dynamicSyncMessage && (
          <Typography color="text.secondary">
            {settings.dynamicSyncMessage}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

interface LinkProps {
  type: SyncTypeEnum | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  btnLoading: boolean;
}
const LinkComponent: React.FC<LinkProps> = ({ type, onChange, btnLoading }) => {
  if (!type) return null;

  const hint =
    type === SyncTypeEnum.yandex
      ? "https://translate.yandex.ru/subscribe?collection_id=5b84234c898789001f7fea81"
      : "https://context.reverso.net/favourites/accountname";

  return (
    <Stack spacing={1}>
      <Typography>Link:</Typography>
      <Box>
        <TextField size="small" disabled={btnLoading} onChange={onChange} />
      </Box>
      <Typography variant="body2" color="text.secondary">
        Example: {hint}
      </Typography>
    </Stack>
  );
};
