import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { IUserDeck } from "../models/deck";
import {
  ICardsSettings,
  IFlashcard,
  LearnType,
  UpdateType,
} from "../models/flashcard";
import { baseApi } from "./baseApi";

export const cardsAPI = createApi({
  reducerPath: "cardsAPI",
  baseQuery: baseApi,
  tagTypes: ["Cards", "Favorites", "Settings"],
  endpoints: (build) => ({
    getCards: build.query<IFlashcard[], void>({
      query: () => "/flashcards",
      providesTags: () => ["Cards"],
    }),
    getFavorites: build.query<IFlashcard[], void>({
      query: () => "/flashcards/favorites",
      providesTags: () => ["Favorites"],
    }),
    getSettings: build.query<ICardsSettings, void>({
      query: () => "/flashcards/settings",
      providesTags: () => ["Settings"],
    }),
    learn: build.mutation<IUserDeck, LearnType>({
      query: (object) => ({
        url: "/flashcards",
        method: "POST",
        body: object,
      }),
    }),
    delete: build.mutation<IUserDeck, string>({
      query: (userDeckId) => ({
        url: `/flashcards/${userDeckId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cards"],
    }),
    favorite: build.mutation<IFlashcard, string>({
      query: (userCardId) => ({
        url: "/flashcards/favorites",
        method: "POST",
        body: { userCardId },
      }),
      invalidatesTags: ["Favorites", "Cards"],
    }),
    update: build.mutation<ICardsSettings, UpdateType>({
      query: (update) => ({
        url: "/flashcards/settings",
        method: "POST",
        body: update,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});
