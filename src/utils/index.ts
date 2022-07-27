export enum HeaderTitleEnum {
  account = "Account",
  shop = "Shop",
  flashcards = "Flashcards",
  flashcardsSettings = "Flashcards settings",
  decks = "Decks",
  decksSettings = "Decks settings",
  quiz = "Quiz",
  quizSettings = "Quiz settings",
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
