import { combineReducers } from "redux"
import userReducer from "./userReducer"
import wordsReducer from "./wordsReducer"
import gameReducer from "./games/reducer"
import bookReducer from "./reducer.book";

const rootReducer = combineReducers({
	user: userReducer,
	words: wordsReducer,
	gameWords: gameReducer,
  book: bookReducer
})

export default rootReducer
