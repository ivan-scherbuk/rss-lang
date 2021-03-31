import { wordsRequest } from "../helpers/requsts.server"
import { ADD_WORDS_CHUNK, ADD_WORDS_GROUP } from "./types"

const addWordsChunk = wordsChunk => ({type: ADD_WORDS_CHUNK, payload: wordsChunk})
const addWordsGroup = wordsGroup => ({type: ADD_WORDS_GROUP, payload: wordsGroup})


export function syncUserWords(){
	return async (dispatch, getState) => {
		const {user, words} = getState()
		for (let groupIndex in user.words) {
			if (user.words.hasOwnProperty(groupIndex)) {
				const pages = []
				for (let pageIndex in user.words[groupIndex]) {
					if (user.words[groupIndex].hasOwnProperty(pageIndex)
						&& (!words[groupIndex] || !words[groupIndex][pageIndex]?.length)) pages.push(pageIndex)
				}
				dispatch(getWords(groupIndex, pages))
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
      return data
		} else {
			try {
				const rawRes = await wordsRequest(group, page)
				const data = await rawRes.json()
				dispatch(addWordsChunk({data, group, page}))
				return data
			} catch (e) {
				return (e)
			}
		}
	}
}