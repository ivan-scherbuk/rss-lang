import { LOADING } from "./types"

const initialState = {
	onLoading: false
}

export default function requestReducer(state = initialState, action){
	if(action.type === LOADING){
		return {...state, onLoading: action.payload ?? false}
	}
	return state
}