import { ADD_WORDS_CHUNK, ADD_WORDS_GROUP } from "./types"

const initialState = {}

export default function wordsReducer(state = initialState, {type, payload}){
	if(type === ADD_WORDS_CHUNK){
		const newVocabulary = {...state}
		if(!newVocabulary[payload.group]) newVocabulary[payload.group] = {}
		newVocabulary[payload.group][payload.page] = payload.data
		return newVocabulary
	} else if(type === ADD_WORDS_GROUP){
		if(!state[payload.group]) return {...state, [payload.group]: payload.data}
		else return {
			...state,
			[payload.group]: {
				...state[payload.group],
				...payload.data
			}
		}
	}
	return state
}