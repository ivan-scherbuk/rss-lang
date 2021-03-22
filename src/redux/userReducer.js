import { LOADING, SIGN_IN, SIGN_OUT } from "./types"

const initialState = {
	id: null,
	email: null,
	token: null,
	isLogged : false,
	onLoading: false,
}

export default function userReducer(state = initialState, action){
	if(action.type === SIGN_IN){
		return {...state, ...action.payload, isLogged: !!action.payload.token}
	} else if(action.type === SIGN_OUT){
		return {...state, ...initialState}
	} else if(action.type === LOADING){
		return {...state, onLoading: action.payload ?? false}
	}
	return state
}