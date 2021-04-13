import { SET_VOCABULARY_SEARCH_MENU_OPENED, SET_VOCABULARY_SEARCH_WORD } from "./types";

const initState = {
  searchWord: "",
  isSearchMenuOpened: false,
}

export default function vocabularySearchReducer(state = initState, action){
  const {type, payload} = action
  switch (type) {
    case SET_VOCABULARY_SEARCH_MENU_OPENED: {
      const {isOpened} = payload
      return {
        searchWord: "",
        isSearchMenuOpened: isOpened
      }
    }
    case SET_VOCABULARY_SEARCH_WORD:{
      const {searchWord} = payload
      return {
        ...state,
        searchWord
      }
    }
    default: {
      return state
    }
  }
}