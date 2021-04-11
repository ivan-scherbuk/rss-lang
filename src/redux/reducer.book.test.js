import {
  setBookMode,
  setButtonsVisible,
  setCurrentGroup,
  setCurrentPage,
  setCurrentVocabularyPage,
  setCurrentWords,
  setTranslateVisible,
  setVocabularyMode,
} from "./actions.book";
import bookReducer from "./reducer.book";

const state = {
  currentGroup: 0,
  currentPageIndex: 0,
  currentVocabularyPage: 0,
  isTranslateVisible: true,
  isButtonsVisible: false,
  currentWords: [],
  mode: null,
  vocabularyMode: "learn",
};

it("length of word should be change", () => {
  const group = 3;
  let action = setCurrentGroup(group);

  let newState = bookReducer(state, action);

  expect(newState.currentGroup).toBe(group);
});

it("current page should be set", () => {
  const currentPage = 3;
  let action = setCurrentPage(currentPage);

  let newState = bookReducer(state, action);

  expect(newState.currentPageIndex).toEqual(currentPage);
});

it("current vocabulary page should be less than max page", () => {
  const maxPage = 30;
  let action = setCurrentVocabularyPage(5);

  let newState = bookReducer(state, action);

  expect(newState.currentVocabularyPage).toBeLessThan(maxPage);
});

it("current vocabulary page should be greater than min page", () => {
  const minPage = -1;
  let action = setCurrentVocabularyPage(1);

  let newState = bookReducer(state, action);

  expect(newState.currentVocabularyPage).toBeGreaterThan(minPage);
});

it("reset translate visible success", () => {
  let action = setTranslateVisible(false);

  let newState = bookReducer(state, action);

  expect(newState.isTranslateVisible).toBeFalsy();
});

it("reset buttons visible success", () => {
  let action = setButtonsVisible(true);

  let newState = bookReducer(state, action);

  expect(newState.isButtonsVisible).toBeTruthy();
});

it("should push word", () => {
  const word = "test";
  let action = setCurrentWords(word);

  let newState = bookReducer(state, action);

  expect(newState.currentWords).toContain(word);
});

it("mode should not be null", () => {
  let action = setBookMode("vocabulary");

  let newState = bookReducer(state, action);

  expect(newState.mode).not.toBeNull();
});

it("vocabulary mode should change correctly", () => {
  const mode = "diffficult";
  let action = setVocabularyMode(mode);

  let newState = bookReducer(state, action);

  expect(newState.vocabularyMode).toMatch(mode);
});
