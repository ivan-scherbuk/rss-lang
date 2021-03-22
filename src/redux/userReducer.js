import { SIGN_IN } from "./types"

const initialState = {
	id: null,
	email: null,
	token: null
}

export default function userReducer(state = initialState, action){
	if(action.type === SIGN_IN){
		return {...state, ...action.payload}
	}
	return state
}