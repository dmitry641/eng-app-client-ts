import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { IUserDeck } from "../models/deck";
import {
  ICardsSettings,
  IUserCard,
  LearnType,
  UpdateType,
} from "../models/flashcard";
import { baseApi } from "./baseApi";
import { updateUserDeckAction } from "./decksApi";

export const cardsAPI = createApi({
  reducerPath: "cardsAPI",
  baseQuery: baseApi,
  tagTypes: ["Cards", "Favorites", "Settings"],
  endpoints: (build) => ({
    getCards: build.query<IUserCard[], void>({
      query: () => "/flashcards",
      providesTags: () => ["Cards"],
    }),
    getFavorites: build.query<IUserCard[], void>({
      query: () => "/flashcards/favorites",
      providesTags: () => ["Favorites"],
    }),
    getSettings: build.query<ICardsSettings, void>({
      query: () => "/flashcards/settings",
      providesTags: () => ["Settings"],
    }),
    learn: build.mutation<
      { userCard: IUserCard; userDeck?: IUserDeck },
      LearnType
    >({
      query: (object) => ({
        url: "/flashcards",
        method: "POST",
        body: object,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const {
          data: { userDeck },
        } = await queryFulfilled;

        if (userDeck) dispatch(updateUserDeckAction(userDeck));

        let isRefetch = false;
        dispatch(
          cardsAPI.util.updateQueryData("getCards", undefined, (draftCards) => {
            const filtered = draftCards.filter((c) => c.id !== arg.userCardId);
            if (!filtered.length) isRefetch = true;
            return filtered;
          })
        );

        if (isRefetch) dispatch(refetchCardsAction);
      },
    }),
    delete: build.mutation<{ result: boolean; userDeck?: IUserDeck }, string>({
      query: (userCardId) => ({
        url: `/flashcards/${userCardId}`,
        method: "DELETE",
      }),
      onQueryStarted: async (userCardId, { dispatch, queryFulfilled }) => {
        const {
          data: { result, userDeck },
        } = await queryFulfilled;

        if (result) {
          dispatch(
            cardsAPI.util.updateQueryData(
              "getCards",
              undefined,
              (draftCards) => {
                const filtered = draftCards.filter((c) => c.id !== userCardId);
                return filtered;
              }
            )
          );
        }

        if (userDeck) dispatch(updateUserDeckAction(userDeck));
      },
    }),
    favorite: build.mutation<IUserCard, string>({
      query: (userCardId) => ({
        url: "/flashcards/favorites",
        method: "POST",
        body: { userCardId },
      }),
      onQueryStarted: async (userCardId, { dispatch, queryFulfilled }) => {
        const { data: userCard } = await queryFulfilled;

        dispatch(
          cardsAPI.util.updateQueryData("getCards", undefined, (draftCards) => {
            const index = draftCards.findIndex((c) => c.id === userCard.id);
            if (index !== -1) draftCards[index] = userCard;
            return draftCards;
          })
        );

        dispatch(
          cardsAPI.util.updateQueryData(
            "getFavorites",
            undefined,
            (draftFavs) => {
              const index = draftFavs.findIndex((c) => c.id === userCard.id);

              if (index === -1) {
                if (userCard.favorite) {
                  draftFavs.push(userCard);
                }
              } else {
                draftFavs = draftFavs.filter((f) => f.id !== userCard.id);
              }

              return draftFavs;
            }
          )
        );
      },
    }),
    update: build.mutation<ICardsSettings, UpdateType>({
      query: (update) => ({
        url: "/flashcards/settings",
        method: "POST",
        body: update,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const { data: settings } = await queryFulfilled;

        dispatch(
          cardsAPI.util.updateQueryData(
            "getSettings",
            undefined,
            () => settings
          )
        );
      },
    }),
  }),
});

export const refetchCardsAction = cardsAPI.util.invalidateTags(["Cards"]);
