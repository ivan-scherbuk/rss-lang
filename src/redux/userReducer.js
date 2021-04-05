import { LOADING, SIGN_IN, LOG_OUT, ADD_WORD_TO_USER, SET_USER_WORDS, SET_USER_SETTINGS } from "./types"

const initialState = {
	id: null,
	email: null,
	token: null,
	tokenExpire: null,
	isLogged : false,
	onLoading: false,
	words: {}
}

function getInitialUser(){
	const savedData = localStorage.getItem("userData")
	if(savedData){
		const parsedData = JSON.parse(savedData)
		return {...initialState, ...parsedData, isLogged: !!parsedData?.token}
	}
	return initialState
}

export default function userReducer(state = getInitialUser(), action){
	switch (action.type){
		case SIGN_IN: {
			return {...state, ...action.payload, isLogged: !!action.payload.token}
		}

		case LOG_OUT: {
			return {...state, ...initialState}
		}

		case LOADING: {
			return {...state, onLoading: action.payload ?? false}
		}

		case SET_USER_WORDS: {
			const userWords = {}
			action.payload.forEach((word) => {
				const {group, page} = word.optional
				if(!userWords[group]) userWords[group] = {}
				if(!Array.isArray(userWords[group][page])) userWords[group][page] = []
				userWords[group][page].push(word)
			})
			return {...state, words: userWords}
		}

		case ADD_WORD_TO_USER: {
			const userWords = {...state.words}
			const {group, page} = action.payload.optional
			if (!userWords[group]) userWords[group] = {}
			if(!Array.isArray(userWords[group][page])){
				userWords[group][page] = []
				userWords[group][page].push(action.payload)
			} else {

				const wordIndex = userWords[group][page].findIndex(word => word.id === action.payload.id)
        console.log(action.payload,userWords[group][page])
				if(wordIndex >= 0){
					userWords[group][page][wordIndex] = {
						...userWords[group][page][wordIndex],
						...action.payload,
						optional:{
							...userWords[group][page][wordIndex].optional,
							...action.payload.optional
						}}
          console.log(userWords[group][page][wordIndex])
				} else {
					userWords[group][page].push(action.payload)
				}
			}
			return {...state, words: userWords}
		}

    case SET_USER_SETTINGS: {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
          optional:{
            ...state.settings.optional,
            ...action.payload.optional
          }
        },
      }
    }
		default: return state
	}
}