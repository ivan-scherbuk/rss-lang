import {
  REMOVE_PAGE_FROM_LIST,
  SET_BOOK_AVAILABLE_PAGES, SET_BOOK_BUTTONS_VISIBLE,
  SET_BOOK_MODE, SET_BOOK_TRANSLATE_VISIBLE,
  SET_CURRENT_GROUP,
  SET_CURRENT_PAGE, SET_CURRENT_WORDS, SET_VOCABULARY_MODE,
} from "./types";

export const removePagesFromPageList = (group, page) => ({type: REMOVE_PAGE_FROM_LIST, payload:{group, page}})
export const setCurrentPage = page => ({type: SET_CURRENT_PAGE, payload:{page}})
export const setCurrentGroup = group => ({type: SET_CURRENT_GROUP, payload:{group}})
export const setCurrentWords = words => ({type: SET_CURRENT_WORDS, payload:{words}})
export const setBookMode = mode => ({type: SET_BOOK_MODE, payload:{mode}})
export const setButtonsVisible = visibility => ({type: SET_BOOK_BUTTONS_VISIBLE, payload:{visibility}})
export const setTranslateVisible = visibility => ({type: SET_BOOK_TRANSLATE_VISIBLE, payload:{visibility}})
export const setVocabularyMode = mode => ({type: SET_VOCABULARY_MODE, payload: {mode}})