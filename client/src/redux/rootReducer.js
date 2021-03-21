import { combineReducers } from "redux"
import authReducer from "./authReducer"
import wordsReducer from "./wordsReducer"

const rootReducer = combineReducers({
		auth: authReducer,
		words: wordsReducer
})

export default rootReducer