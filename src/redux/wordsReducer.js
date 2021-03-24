import { ADD_WORDS_CHUNK } from "./types"

const initialState = {}

export default function wordReducer(state = initialState, action){
	if(action.type === ADD_WORDS_CHUNK){
		const newVocabulary = {...state}
		if(!newVocabulary[action.payload.group]) newVocabulary[action.payload.group] = {}
		newVocabulary[action.payload.group][action.payload.page] = action.payload.data
		return newVocabulary
	}
	return state
}