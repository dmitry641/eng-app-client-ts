import { createApi } from "@reduxjs/toolkit/dist/query/react";
import {
  IDeck,
  IDecksSettings,
  IUserDeck,
  MoveUserDeck,
  SyncData,
} from "../models/deck";
import { baseApi } from "./baseApi";

export const decksAPI = createApi({
  reducerPath: "decksAPI",
  baseQuery: baseApi,
  tagTypes: ["UserDeck", "Deck", "Settings"],
  endpoints: (build) => ({
    getUserDecks: build.query<IUserDeck[], void>({
      query: () => ({ url: "/decks" }),
      providesTags: () => ["UserDeck"],
    }),
    enable: build.mutation<IUserDeck, string>({
      query: (userDeckId) => ({
        url: "/decks/enable",
        method: "POST",
        body: { userDeckId },
      }),
      invalidatesTags: ["UserDeck"],
    }),
    move: build.mutation<IUserDeck, MoveUserDeck>({
      query: ({ userDeckId, position }) => ({
        url: "/decks/move",
        method: "POST",
        body: { userDeckId, position },
      }),
      invalidatesTags: ["UserDeck"],
    }),
    create: build.mutation<IUserDeck, FormData>({
      query: (formdata) => ({
        url: "/decks",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["UserDeck"],
    }),
    delete: build.mutation<IUserDeck, string>({
      query: (userDeckId) => ({
        url: `/decks/delete/${userDeckId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserDeck", "Deck"],
    }),
    toggleUDToPD: build.mutation<IUserDeck, string>({
      query: (userDeckId) => ({
        url: "/decks/toggle",
        method: "POST",
        body: { userDeckId },
      }),
      invalidatesTags: ["UserDeck"],
    }),
    getDecks: build.query<IDeck[], void>({
      query: () => ({ url: "/decks/public" }),
      providesTags: () => ["Deck"],
    }),
    addPDtoUD: build.mutation<IDeck, string>({
      query: (deckId) => ({
        url: "/decks/public",
        method: "POST",
        body: { deckId },
      }),
      invalidatesTags: ["UserDeck", "Deck"],
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
      invalidatesTags: ["Settings"],
    }),
    updateAutoSync: build.mutation<IDecksSettings, boolean>({
      query: (value) => ({
        url: "/decks/settings/autosync",
        method: "POST",
        body: { value },
      }),
      invalidatesTags: ["Settings"],
    }),
    sync: build.mutation<IUserDeck, void>({
      query: () => ({
        url: "/decks/dynamic/sync",
        method: "POST",
      }),
      invalidatesTags: ["UserDeck", "Settings"],
    }),
    createDynamic: build.mutation<IUserDeck, void>({
      query: () => ({
        url: "/decks/dynamic",
        method: "POST",
      }),
      invalidatesTags: ["UserDeck", "Settings"],
    }),
    deleteDynamic: build.mutation<IDecksSettings, void>({
      query: () => ({
        url: "/decks/dynamic/",
        method: "DELETE",
      }),
      invalidatesTags: ["UserDeck", "Settings"],
    }),
  }),
});
