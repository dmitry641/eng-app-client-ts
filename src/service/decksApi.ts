import { createApi } from "@reduxjs/toolkit/dist/query/react";
import {
  DeckSetResponse,
  IDeck,
  IDecksSettings,
  IUserDeck,
  MoveUserDeck,
  SyncData,
} from "../models/deck";
import { baseApi } from "./baseApi";
import { refetchCardsAction } from "./cardsApi";

export const decksAPI = createApi({
  reducerPath: "decksAPI",
  baseQuery: baseApi,
  tagTypes: ["UserDeck", "Deck", "Settings"],
  endpoints: (build) => ({
    getUserDecks: build.query<IUserDeck[], void>({
      query: () => ({ url: "/decks" }),
      providesTags: () => ["UserDeck"],
    }),
    create: build.mutation<IUserDeck, FormData>({
      query: (formdata) => ({
        url: "/decks",
        method: "POST",
        body: formdata,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const { data: userDeck } = await queryFulfilled;
        dispatch(appendUserDeckAction(userDeck));
        dispatch(refetchCardsAction);
      },
    }),

    enable: build.mutation<IUserDeck, string>({
      query: (userDeckId) => ({
        url: "/decks/enable",
        method: "POST",
        body: { userDeckId },
      }),
      onQueryStarted: async (userDeckId, { dispatch, queryFulfilled }) => {
        const { data: userDeck } = await queryFulfilled;
        dispatch(updateUserDeckAction(userDeck));
        dispatch(refetchCardsAction);
      },
    }),
    move: build.mutation<IUserDeck[], MoveUserDeck>({
      query: ({ userDeckId, position }) => ({
        url: "/decks/move",
        method: "POST",
        body: { userDeckId, position },
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const { data: userDecks } = await queryFulfilled;
        dispatch(
          decksAPI.util.updateQueryData(
            "getUserDecks",
            undefined,
            () => userDecks
          )
        );
      },
    }),
    delete: build.mutation<boolean, string>({
      query: (userDeckId) => ({
        url: `/decks/delete/${userDeckId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Deck"],
      onQueryStarted: async (userDeckId, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(filterUserDecksAction(userDeckId));
      },
    }),
    toggleUDToPD: build.mutation<IUserDeck, string>({
      query: (userDeckId) => ({
        url: "/decks/toggle",
        method: "POST",
        body: { userDeckId },
      }),
      onQueryStarted: async (userDeckId, { dispatch, queryFulfilled }) => {
        const { data: userDeck } = await queryFulfilled;
        dispatch(updateUserDeckAction(userDeck));
      },
    }),

    getDecks: build.query<IDeck[], void>({
      query: () => ({ url: "/decks/public" }),
      providesTags: () => ["Deck"],
    }),
    addPDtoUD: build.mutation<IUserDeck, string>({
      query: (deckId) => ({
        url: "/decks/public",
        method: "POST",
        body: { deckId },
      }),
      invalidatesTags: ["Deck"],
      onQueryStarted: async (deckId, { dispatch, queryFulfilled }) => {
        const { data: userDeck } = await queryFulfilled;
        dispatch(appendUserDeckAction(userDeck));
        dispatch(refetchCardsAction);
      },
    }),

    getSettings: build.query<IDecksSettings, void>({
      query: () => ({ url: "/decks/settings" }),
      providesTags: () => ["Settings"],
    }),
    updateSyncData: build.mutation<IDecksSettings, SyncData>({
      query: (syncData) => ({
        url: "/decks/settings/syncdata",
        method: "POST",
        body: syncData,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const { data: settings } = await queryFulfilled;
        dispatch(setDecksSettingsAction(settings));
      },
    }),
    updateAutoSync: build.mutation<IDecksSettings, boolean>({
      query: (value) => ({
        url: "/decks/settings/autosync",
        method: "POST",
        body: { value },
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const { data: settings } = await queryFulfilled;
        dispatch(setDecksSettingsAction(settings));
      },
    }),

    sync: build.mutation<DeckSetResponse, void>({
      query: () => ({
        url: "/decks/dynamic/sync",
        method: "POST",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const {
          data: { settings, userDeck },
        } = await queryFulfilled;
        dispatch(updateUserDeckAction(userDeck));
        dispatch(setDecksSettingsAction(settings));
        dispatch(refetchCardsAction);
      },
    }),
    createDynamic: build.mutation<DeckSetResponse, void>({
      query: () => ({
        url: "/decks/dynamic",
        method: "POST",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const {
          data: { userDeck, settings },
        } = await queryFulfilled;
        dispatch(setDecksSettingsAction(settings));
        dispatch(appendUserDeckAction(userDeck));
      },
    }),
    deleteDynamic: build.mutation<IDecksSettings, string>({
      query: () => ({
        url: "/decks/dynamic/",
        method: "DELETE",
      }),
      onQueryStarted: async (userDeckId, { dispatch, queryFulfilled }) => {
        const { data: settings } = await queryFulfilled;
        dispatch(setDecksSettingsAction(settings));
        dispatch(filterUserDecksAction(userDeckId));
      },
    }),
  }),
});

export const updateUserDeckAction = (userDeck: IUserDeck) =>
  decksAPI.util.updateQueryData("getUserDecks", undefined, (draftUserDecks) => {
    const index = draftUserDecks.findIndex((c) => c.id === userDeck.id);

    if (index !== -1) {
      draftUserDecks[index] = userDeck;
    }

    return draftUserDecks;
  });

const filterUserDecksAction = (userDeckId: string) =>
  decksAPI.util.updateQueryData("getUserDecks", undefined, (draftUserDecks) => {
    const filtered = draftUserDecks.filter((d) => d.id !== userDeckId);
    return filtered;
  });

const setDecksSettingsAction = (settings: IDecksSettings) =>
  decksAPI.util.updateQueryData("getSettings", undefined, () => settings);

const appendUserDeckAction = (userDeck: IUserDeck) =>
  decksAPI.util.updateQueryData("getUserDecks", undefined, (draftDecks) => {
    draftDecks.push(userDeck);
    return draftDecks;
  });
