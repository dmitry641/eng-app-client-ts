import { createApi } from "@reduxjs/toolkit/dist/query/react";
import {
  AddChangeResponse,
  IImage,
  IQuestion,
  ITopic,
  IUserTopic,
  LearnResponse,
} from "../models/quiz";
import { baseApi } from "./baseApi";

export const quizAPI = createApi({
  reducerPath: "quizAPI",
  baseQuery: baseApi,
  tagTypes: ["CurrentUT", "UserTopic", "Topic", "Question", "Image"],
  endpoints: (build) => ({
    INIT: build.query<IUserTopic, void>({
      query: () => "/quiz/init",
      providesTags: () => ["CurrentUT"],
      onQueryStarted: async (arg, { dispatch, getState, queryFulfilled }) => {
        await queryFulfilled;

        const refetchEndpoints = [
          quizAPI.endpoints.getQuestions,
          quizAPI.endpoints.getUserTopics,
          quizAPI.endpoints.getTopics,
        ];

        for (const endpoint of refetchEndpoints) {
          endpoint.initiate(undefined, {
            forceRefetch: true,
          })(dispatch, getState, undefined);
        }
      },
    }),
    getUserTopics: build.query<IUserTopic[], void>({
      query: () => "/quiz",
      providesTags: () => ["UserTopic"],
    }),
    select: build.mutation<AddChangeResponse, string>({
      query: (userTopicId) => ({
        url: "/quiz/select",
        method: "POST",
        body: { userTopicId },
      }),
      onQueryStarted: async (userTopicId, { dispatch, queryFulfilled }) => {
        const {
          data: { currentUT, userTopics, questions },
        } = await queryFulfilled;

        dispatch(setUserTopicsAction(userTopics));
        dispatch(setCurrentUTAction(currentUT));
        dispatch(setQuestionsAction(questions));
      },
    }),
    block: build.mutation<IUserTopic, string>({
      query: (userTopicId) => ({
        url: "/quiz/block",
        method: "POST",
        body: { userTopicId },
      }),
      onQueryStarted: async (userTopicId, { dispatch, queryFulfilled }) => {
        const { data: userTopic } = await queryFulfilled;
        dispatch(updateUserTopicAction(userTopic));
      },
    }),

    getTopics: build.query<ITopic[], void>({
      query: () => "/quiz/topics",
      providesTags: () => ["Topic"],
    }),
    addTopic: build.mutation<AddChangeResponse, string>({
      query: (topicId) => ({
        url: "/quiz/topics",
        method: "POST",
        body: { topicId },
      }),
      onQueryStarted: async (topicId, { dispatch, queryFulfilled }) => {
        const {
          data: { currentUT, userTopics, questions },
        } = await queryFulfilled;

        dispatch(setUserTopicsAction(userTopics));
        dispatch(setCurrentUTAction(currentUT));
        dispatch(setQuestionsAction(questions));

        let isRefetch = false;
        dispatch(
          quizAPI.util.updateQueryData(
            "getTopics",
            undefined,
            (draftTopics) => {
              const filtered = draftTopics.filter((t) => t.id !== topicId);
              if (!filtered.length) isRefetch = true;
              return filtered;
            }
          )
        );

        isRefetch && dispatch(refetchTopicsAction);
      },
    }),

    getQuestions: build.query<IQuestion[], void>({
      query: () => "/quiz/questions",
      providesTags: () => ["Question"],
    }),
    learn: build.mutation<LearnResponse, string>({
      query: (questionId) => ({
        url: "/quiz/questions",
        method: "POST",
        body: { questionId },
      }),
      onQueryStarted: async (questionId, { dispatch, queryFulfilled }) => {
        const {
          data: { changeTopic },
        } = await queryFulfilled;

        if (changeTopic) {
          dispatch(refetchCurrentUTAction);
          return;
        }

        let isRefetch = false;
        dispatch(
          quizAPI.util.updateQueryData(
            "getQuestions",
            undefined,
            (draftQuestions) => {
              const filtered = draftQuestions.filter(
                (c) => c.id !== questionId
              );
              if (!filtered.length) isRefetch = true;
              return filtered;
            }
          )
        );

        isRefetch && dispatch(refetchQuestionsAction);
      },
    }),

    getImages: build.query<IImage[], string>({
      query: (search) => ({
        url: "/quiz/images",
        params: {
          search,
          width: window.innerWidth,
        },
      }),
      providesTags: () => ["Image"],
      transformResponse: async (images: IImage[]): Promise<IImage[]> => {
        for (const image of images) {
          const responses = await Promise.all([
            fetch(image.original),
            fetch(image.thumbnail),
          ]);
          const blobs = await Promise.all([
            responses[0].blob(),
            responses[1].blob(),
          ]);
          image.original = URL.createObjectURL(blobs[0]);
          image.thumbnail = URL.createObjectURL(blobs[1]);
        }

        return images;
      },
    }),
  }),
});

const refetchQuestionsAction = quizAPI.util.invalidateTags(["Question"]);
const refetchCurrentUTAction = quizAPI.util.invalidateTags(["CurrentUT"]);
const refetchTopicsAction = quizAPI.util.invalidateTags(["Topic"]);

const setCurrentUTAction = (userTopic: IUserTopic) =>
  quizAPI.util.updateQueryData("INIT", undefined, () => userTopic);

const setUserTopicsAction = (userTopics: IUserTopic[]) =>
  quizAPI.util.updateQueryData("getUserTopics", undefined, () => userTopics);

const setQuestionsAction = (questions: IQuestion[]) =>
  quizAPI.util.updateQueryData("getQuestions", undefined, () => questions);

const updateUserTopicAction = (userTopic: IUserTopic) =>
  quizAPI.util.updateQueryData(
    "getUserTopics",
    undefined,
    (draftUserTopics) => {
      const index = draftUserTopics.findIndex((ut) => ut.id === userTopic.id);

      if (index !== -1) {
        draftUserTopics[index] = userTopic;
      }

      return draftUserTopics;
    }
  );
