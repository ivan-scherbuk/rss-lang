import { userWordsRequest, userSettingsRequest } from "../helpers/requsts.server"
import {checkToken} from "./actions.auth"
import { ADD_WORD_TO_USER, SET_USER_WORDS, SET_USER_SETTINGS } from "./types"

const addWordToUser = word => ({type: ADD_WORD_TO_USER, payload: word})
const serUserWords = wordSet => ({type: SET_USER_WORDS, payload: wordSet})


export function setUserSettings(settings){
  try{
    const localData = JSON.parse(localStorage.getItem("userData"))
    localStorage.setItem("userData", JSON.stringify({
      ...localData,
      settings:{
        ...localData.settings,
        ...settings,
        optional:{
          ...localData.settings.optional,
          ...settings.optional
        }
      }
    }))
  } catch(e){}
  return {type: SET_USER_SETTINGS, payload: settings}
}

export function getUserWords(){
	return async (dispatch, getState) => {
    const token = await dispatch(checkToken())
    if(token){
      const {id} = getState().user
      const rawRes = await userWordsRequest({token, id, method: "GET"})
      if (rawRes.ok) {
        const wordSet = await rawRes.json()
        dispatch(serUserWords(wordSet))
        return wordSet
      }
    } else {
      console.log("token expired")
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
		const token = await dispatch(checkToken())
    if(token){
      const {id} = getState().user
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
    } else {
      console.log("token expired")
    }
	}
}

export function updateExistingUserWord(word){
	return async (dispatch, getState) => {
		const token = await dispatch(checkToken())
    if(token){
      const {id} = getState().user
      const rawRes = await userWordsRequest({
        token,
        id,
        wordId: word.wordId,
        word: word,
        method: "PUT"
      })
      if (rawRes.ok) {
        const res = await rawRes.json()
        dispatch(addWordToUser(res))
      }
    } else {
      console.log("token expired")
    }
	}
}

export function updateUserSettings(settings){
  return async (dispatch, getState) => {
    const token = await dispatch(checkToken())
    if(token){
      const {id, settings:currentSettings} = getState().user
      const updatedSettings = {
        ...currentSettings,
        ...settings,
        optional:{
          ...currentSettings.optional,
          ...settings.optional
        }
      }
      const rawRes = await userSettingsRequest({token, id, method:"POST", updatedSettings})
      if (rawRes.ok) {
        const res = await rawRes.json()
        dispatch(setUserSettings(res))
      }
    } else {
      console.log("token expired")
    }
  }
}
