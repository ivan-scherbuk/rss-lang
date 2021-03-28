import { combineReducers } from "redux"
import userReducer from "./userReducer"
import wordsReducer from "./wordsReducer"
import gameReducer from "./games/reducer"

const rootReducer = combineReducers({
	user: userReducer,
	words: wordsReducer,
	gameWords: gameReducer,
})

export default rootReducer
