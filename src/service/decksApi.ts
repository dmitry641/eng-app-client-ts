import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { IDeck, IUserDeck, MoveUserDeck } from "../models/deck";
import { baseApi } from "./baseApi";
import { refetchCardsAction } from "./cardsApi";

export const decksAPI = createApi({
  reducerPath: "decksAPI",
  baseQuery: baseApi,
  tagTypes: ["UserDeck", "Deck"],
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
    delete: build.mutation<IUserDeck, IUserDeck>({
      query: (userDeck) => ({
        url: `/decks/delete/${userDeck.id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (userDeck, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        if (userDeck.published) {
          dispatch(appendPublicDeckAction(userDeck.deck));
        }
        dispatch(filterUserDecksAction(userDeck.id));
      },
    }),
    publish: build.mutation<IUserDeck, string>({
      query: (userDeckId) => ({
        url: "/decks/publish",
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
      onQueryStarted: async (deckId, { dispatch, queryFulfilled }) => {
        const { data: userDeck } = await queryFulfilled;
        dispatch(filterPublicDecksAction(deckId));
        dispatch(appendUserDeckAction(userDeck));
        dispatch(refetchCardsAction);
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
    const filtered = draftUserDecks.filter((ud) => ud.id !== userDeckId);
    return filtered;
  });

const filterPublicDecksAction = (deckId: string) =>
  decksAPI.util.updateQueryData("getDecks", undefined, (draftDecks) => {
    const filtered = draftDecks.filter((d) => d.id !== deckId);
    return filtered;
  });

const appendUserDeckAction = (userDeck: IUserDeck) =>
  decksAPI.util.updateQueryData("getUserDecks", undefined, (draftUserDecks) => {
    draftUserDecks.push(userDeck);
    return draftUserDecks;
  });

const appendPublicDeckAction = (deck: IDeck) =>
  decksAPI.util.updateQueryData("getDecks", undefined, (draftDecks) => {
    draftDecks.push(deck);
    return draftDecks;
  });
