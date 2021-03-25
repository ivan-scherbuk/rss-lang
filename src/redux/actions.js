import { ADD_WORD_TO_USER, ADD_WORDS_CHUNK, LOADING, SIGN_IN, SET_USER_WORDS, LOG_OUT, ADD_WORDS_GROUP } from "./types"
import { authRequest, userWordsRequest, userDataRequest, wordsRequest } from "./requests/server"
//import {indexedDBRequest} from "./requests/indexedDB"


const setLoading = status => ({type: LOADING, payload: status ?? true})
const setUser = userData => ({type: SIGN_IN, payload: userData})
const unsetUser = () => ({type: LOG_OUT})
const addWordsChunk = wordsChunk => ({type: ADD_WORDS_CHUNK, payload: wordsChunk})
const addWordsGroup = wordsGroup => ({type: ADD_WORDS_GROUP, payload: wordsGroup})
const addWordToUser = word => ({type: ADD_WORD_TO_USER, payload: word})
const serUserWords = wordSet => ({type: SET_USER_WORDS, payload: wordSet})

export function createUser(user){
	return async dispatch => {
		dispatch(setLoading())
		const rawRes = await authRequest("/users", user)
		if (rawRes.ok) {
			dispatch(signIn(user, true))
		} else {
			dispatch(setLoading(false))
		}
	}
}

export function signIn(user, onLoading = false){
	return async (dispatch) => {

		if (!onLoading) dispatch(setLoading())
		const rawRes = await authRequest("/signin", user)
		if (rawRes.ok) {
			const userAuthData = await rawRes.json()
			const userRawData = await userDataRequest({token: userAuthData.token, id: userAuthData.userId})

			if (userRawData.ok) {
				const userData = await userRawData.json()
				const fullUserData = {...userAuthData, ...userData, words: {}}
				dispatch(setUser(fullUserData))
				await dispatch(getUserWords())
				await dispatch(syncUserWords())
				localStorage.setItem("userData", JSON.stringify(fullUserData))
				try {

				} catch (e) {
				}
			}
		}
		dispatch(setLoading(false))
	}
}

export function logOut(){
	return dispatch => {
		try {
			localStorage.setItem("userData", "")
		} catch (e) {
		}
		dispatch(unsetUser())
	}
}

export function syncUserWords(){
	return async (dispatch, getState) => {
		const {user, words} = getState()
		for (let groupIndex in user.words) {
			if (user.words.hasOwnProperty(groupIndex))
				for (let pageIndex in user.words[groupIndex]) {
					if (user.words[groupIndex].hasOwnProperty(pageIndex)
						&& (!words[groupIndex] || !words[groupIndex][pageIndex]?.length)) {
						dispatch(getWords(groupIndex, pageIndex))
					}
				}
		}
	}
}

export function getWords(group = 0, page = 0){
	return async dispatch => {
		if (Array.isArray(page)) {
			const promiseQueue = []
			page.forEach((pageNum) => {
				promiseQueue.push(wordsRequest(group, pageNum))
			})

			const rawRes = await Promise.all(promiseQueue)
			const res = await Promise.all(rawRes.map((rawResPage) => {
				return rawResPage.json()
			}))
			const data = {}
			res.forEach((resPage) => {
				data[resPage[0].page] = resPage
			})
			dispatch(addWordsGroup({data, group}))
		} else {
			try {
				const rawRes = await wordsRequest(group, page)
				const data = await rawRes.json()
				dispatch(addWordsChunk({data, group, page}))
				//indexedDBRequest()
				return data
			} catch (e) {
				return (e)
			}
		}
	}
}

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
		deleted: false,
	}

	return async (dispatch, getState) => {
		const {token, id} = getState().user
		const userWord = {
			difficulty: data.difficulty || "normal",
			optional: {
				...optionalPattern,
				...data,
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
		}
	}
}

export function updateUserWord(word){
	return async (dispatch, getState) => {
		const {token, id} = getState().user
		const rawRes = await userWordsRequest({
			token,
			id,
			method: "PUT",
			wordId: word.id,
			word: word,
		})
		if (rawRes.ok) {
			const res = await rawRes.json()
			dispatch(addWordToUser(res))
		}
	}
}