import { LOADING, SIGN_IN } from "./types"

const server = 'https://rss-words-3.herokuapp.com'

const authRequest = async (path, user) => {
	return await fetch(server+path, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})
}

const setLoading = status => ({type: LOADING, payload: status ?? true})
const setUser = userData => ({type: SIGN_IN, payload: userData})

export function createUser(user){
	return async dispatch => {
		dispatch(setLoading())
		const rawRes = await authRequest('/users', user)
		if(rawRes.ok){
			dispatch(signIn(user, true))
		} else {
			dispatch(setLoading(false))
		}
	}
}

export function signIn(user, onLoading = false){
	return async (dispatch) => {
		if(!onLoading) dispatch(setLoading())
		const rawRes = await authRequest('/signin', user)
		if(rawRes.ok){
			const userData = await rawRes.json();
			dispatch(setUser(userData))
		}
		dispatch(setLoading(false))
	}
}