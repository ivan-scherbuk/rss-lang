import { userWordsRequest } from "./requests/server"
import {checkToken} from "./actions.auth"
import { ADD_WORD_TO_USER, SET_USER_WORDS, } from "./types"
//import {indexedDBRequest} from "./requests/indexedDB"

const addWordToUser = word => ({type: ADD_WORD_TO_USER, payload: word})
const serUserWords = wordSet => ({type: SET_USER_WORDS, payload: wordSet})


export function getUserWords(){
	return async (dispatch, getState) => {
		const {token, id} = getState().user
		const rawRes = await userWordsRequest({token, id, method: "GET"})
		if (rawRes.ok) {
			const wordSet = await rawRes.json()
			dispatch(serUserWords(wordSet))
			return wordSet
		}
	}
}

export function addUserWord(word, data = {}){

	const optionalPattern = {
		group: word.group,
		page: word.page,
		successCounter: 0,
		failCounter: 0,
		deleted: false,
	}
	const addData = {...data}
	const difficulty = addData.difficulty
	delete addData.difficulty

	return async (dispatch, getState) => {
		await dispatch(checkToken())
		const {token, id} = getState().user
		const userWord = {
			difficulty: difficulty || "normal",
			optional: {
				...optionalPattern,
				...addData,
			},
		}
		const rawRes = await userWordsRequest({
			token,
			id,
			method: "POST",
			wordId: word.id,
			word: userWord,
		})
		if (rawRes.ok) {
			const res = await rawRes.json()
			dispatch(addWordToUser(res))
			return res
		}
	}
}

export function updateExistingUserWord(word){
	return async (dispatch, getState) => {
		await dispatch(checkToken())
		const {token, id} = getState().user
		const rawRes = await userWordsRequest({
			token,
			id,
			method: "PUT",
			wordId: word.wordId,
			word: word,
		})
		if (rawRes.ok) {
			const res = await rawRes.json()
			dispatch(addWordToUser(res))
		}
	}
}