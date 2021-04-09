import {
  LOG_OUT,
  REMOVE_PAGE_FROM_LIST,
  SET_BOOK_AVAILABLE_PAGES, SET_BOOK_BUTTONS_VISIBLE,
  SET_BOOK_MODE, SET_BOOK_TRANSLATE_VISIBLE,
  SET_CURRENT_GROUP,
  SET_CURRENT_PAGE, SET_CURRENT_VOCABULARY_PAGE, SET_CURRENT_WORDS, SET_VOCABULARY_MODE, SIGN_IN,
} from "./types";
import { MODE_BOOK, SETTINGS, VOCABULARY_MODE_DIFFICULT, VOCABULARY_MODE_NORMAL } from "../settings";

function getInitPagesList(){
  const initPages = {}
  for(let i = 0; i < SETTINGS.GROUPS_COUNT; i++){
    initPages[i] = [...Object.keys(Array(SETTINGS.PAGES_COUNT).fill(0)).map(index => Number(index))]
  }
  return initPages
}

const initialBookState = {
  currentGroup: 0,
  currentPageIndex: 0,
  currentVocabularyPage: 0,
  pagesList: getInitPagesList(),
  mode: MODE_BOOK,
  vocabularyMode: VOCABULARY_MODE_NORMAL,
  isButtonsVisible: true,
  isTranslateVisible: true,
  currentWords: [],
  savedUserSettings:{
    isButtonsVisible: true,
    isTranslateVisible: true,
  }
}

export default function bookReducer(state = initialBookState, {type, payload}){
  switch (type) {
    case SET_BOOK_AVAILABLE_PAGES: {
      const {group, list} = payload
      return {
        ...state,
        pages:{
          ...state.pagesList,
          [group]: list
        }
      }
    }
    case REMOVE_PAGE_FROM_LIST: {
      const {group, page} = payload
      const newPagesList = [...state.pagesList[group]]
      function removePage(pageIndex){
        const pageToRemoveIndex = newPagesList.findIndex(pageNumber => pageNumber === Number(pageIndex))
        if(pageToRemoveIndex + 1){
          newPagesList.splice(pageToRemoveIndex, 1)
        }
      }
      if(Number.isInteger(page)) {
        removePage(page)
      }
      else if(Array.isArray(page)) {
        page.forEach(singlePage => {
          removePage(singlePage)
        })
      }
      return {
        ...state,
        pagesList: {
          ...state.pagesList,
          [group]: newPagesList
        }
      }
    }

    case SET_CURRENT_PAGE:{
      const {page} = payload
      if(page === state.currentPageIndex) return state
      return {
        ...state,
        currentPageIndex: page
      }
    }

    case SET_CURRENT_GROUP:{
      const {group} = payload
      if(group === state.currentGroup) return state
      return {
        ...state,
        currentGroup: group
      }
    }

    case SET_BOOK_MODE:{
      const {mode} = payload
      if(mode === state.mode) return state
      return {...state, mode}
    }

    case SET_BOOK_TRANSLATE_VISIBLE:{
      const {visibility} = payload
      return {...state, isTranslateVisible: visibility}
    }

    case SET_BOOK_BUTTONS_VISIBLE:{
      const {visibility} = payload
      return {...state, isButtonsVisible: visibility}
    }

    case SET_VOCABULARY_MODE:{
      const {mode} = payload
      if(mode === state.vocabularyMode) return state
      return {...state, vocabularyMode: mode}
    }

    case SET_CURRENT_WORDS:{
      const {words} = payload
      return {...state, currentWords: words}
    }

    case SET_CURRENT_VOCABULARY_PAGE:{
      const {page} = payload
      if(page === state.currentVocabularyPage) return state
      return {...state, currentVocabularyPage: page}
    }

    case LOG_OUT:{
      const {isButtonsVisible, isTranslateVisible} = initialBookState
      return {
        ...state,
        isButtonsVisible,
        isTranslateVisible,
        savedUserSettings: {
          isButtonsVisible: state.isButtonsVisible,
          isTranslateVisible: state.isTranslateVisible
        }
      }
    }

    case SIGN_IN:{
      const {isButtonsVisible, isTranslateVisible} = state.savedUserSettings
      return {
        ...state,
        isButtonsVisible,
        isTranslateVisible
      }
    }

    default: {
      return state
    }
  }
}