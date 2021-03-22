import { combineReducers } from "redux"
import userReducer from "./userReducer"
import wordsReducer from "./wordsReducer"
import requestReducer from "./requestReducer"

const rootReducer = combineReducers({
	user: userReducer,
	words: wordsReducer,
	request: requestReducer
})

export default rootReducer