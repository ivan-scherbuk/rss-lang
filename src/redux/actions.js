import { ADD_WORD_TO_USER, ADD_WORDS_CHUNK, LOADING, SIGN_IN, SET_USER_WORDS, LOG_OUT } from "./types"

const server = "https://rss-words-3.herokuapp.com"

const authRequest = async (path, user) => {
	return await fetch(server + path, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
}

const userWordsRequest = async ({token, id, method, wordId, word = {}}) => {
	let request = `${server}/users/${id}/words`
	if (wordId) request += "/" + wordId
	const requestData = {
		method: method || "GET",
		withCredentials: true,
		headers: {
			"Authorization": `Bearer ${token}`,
			"Accept": "application/json",
			"Content-Type": "application/json",
		}
	}
	if(method !== "GET") requestData.body = JSON.stringify(word)
	return await fetch(request, requestData)
}


const setLoading = status => ({type: LOADING, payload: status ?? true})
const setUser = userData => ({type: SIGN_IN, payload: userData})
const unsetUser = () => ({type: LOG_OUT})
const addWordsChunk = wordsChunk => ({type: ADD_WORDS_CHUNK, payload: wordsChunk})
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
			const userRawData = await fetch(`${server}/users/${userAuthData.userId}`,{
				method: "GET",
				headers: {
					"Authorization": `Bearer ${userAuthData.token}`,
					"Accept": "application/json",
					"Content-Type": "application/json",
				}
			})
			if(userRawData.ok){
				const userData = await userRawData.json()
				const fullUserData = {...userAuthData, ...userData}
				dispatch(setUser(fullUserData))
				try{
					localStorage.setItem("userData", JSON.stringify(fullUserData))
				}catch(e){}
				dispatch(getUserWords())
			}
		}
		dispatch(setLoading(false))
	}
}

export function logOut(){
	return dispatch => {
		try{
			localStorage.setItem("userData", "")
		} catch(e){}
		dispatch(unsetUser())
	}
}

export function getWords(group = 0, page = 0){
	return async dispatch => {
		const rawRes = await fetch(`${server}/words?page=${page}&group=${group}`)
		if (rawRes.ok) {
			const data = await rawRes.json()
			dispatch(addWordsChunk({data, group, page}))
		}
	}
}

export function getUserWords(){
	return async(dispatch, getState) => {
		const {token, id} = getState().user
		const rawRes = await userWordsRequest({token, id, method:"GET"})
		if (rawRes.ok) {
			const wordSet = await rawRes.json()
			dispatch(serUserWords(wordSet))
		}
	}
}

export function addUserWord(word, data = {}){
	return async (dispatch, getState) => {
		const {token, id} = getState().user
		const userWord = {
			difficulty: data.difficulty || "normal",
			optional:{
				group: word.group,
				page: word.page,
				...data
			}
		}
		const rawRes = await userWordsRequest({
			token,
			id,
			method: "POST",
			wordId: word.id,
			word: userWord
		})
		if (rawRes.ok) {
			const res = await rawRes.json()
			dispatch(addWordToUser(res))
		}
	}
}

export function updateUserWord(word){
	return async(dispatch, getState) => {
		const {token, id} = getState().user
		const rawRes = await userWordsRequest({
			token,
			id,
			method: "PUT",
			wordId: word.id,
			word: word
		})
		if (rawRes.ok) {
			const res = await rawRes.json()
			dispatch(addWordToUser(res))
		}
	}
}


