import { SET_VOCABULARY_SEARCH_MENU_OPENED, SET_VOCABULARY_SEARCH_WORD } from "./types";


export const setVocabularySearchMenuOpened = isOpened => ({type:SET_VOCABULARY_SEARCH_MENU_OPENED, payload:{isOpened}})
export const setVocabularySearchWord = searchWord => ({type:SET_VOCABULARY_SEARCH_WORD, payload:{searchWord: searchWord}})