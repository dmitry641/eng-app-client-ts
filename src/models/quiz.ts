export interface IUserTopic {
  id: string;
  updatedAt: Date;
  topicId: string;
  totalQuestionCount: number;
  userQuestions: string[];
  topicName: string;
  status: UTStatus;
  questionsInRow: number;
}

export enum UTStatus {
  current = "current",
  paused = "paused",
  started = "started",
  finished = "finished",
  blocked = "blocked",
}

export interface ITopic {
  id: string;
  topicName: string;
  source: string;
}

export interface IQuestion {
  id: string;
  text: string;
  topicId: string;
}

export type LearnResponse = { changeTopic: boolean };

export type AddChangeResponse = {
  currentUT: IUserTopic;
  userTopics: IUserTopic[];
  questions: IQuestion[];
};

export interface IImage {
  original: string;
  thumbnail: string;
  name: string;
  userLink: string;
}
