import { useSelector } from "react-redux"
import { useCallback } from "react"


export function useUserWords(){
	const user = useSelector(state => state.user)
	const words = useSelector(state => state.words)

	//if deleted === undefined - dont filter by deleted flag
	//if deleted === false - return words without deleted
	//if deleted === true - return only deleted words

	const getUserWordsChunk = useCallback((group, page, {difficulty, deleted} = {}) => {
		if (user?.words && user.words[group] && user.words[group][page]?.length > 0) {
			let filteredWords = [...user.words[group][page]]
			if (typeof deleted === "boolean") {
				filteredWords = filteredWords.filter(({optional}) => Boolean(optional.deleted) === deleted)
			}
			if (difficulty) {
				filteredWords = filteredWords.filter((word) => word.difficulty === difficulty)
			}
			return words[group][page].filter(({id}) => {
				const wordIndex = filteredWords.findIndex((userWord) => {
					return userWord.wordId === id
				})
				return !!(wordIndex + 1)
			})
		}
		return []
	}, [words, user])


	const getUserWordsGroup = useCallback((group, {difficulty, deleted} = {}) => {
		const crossedGroup = {}
		if (user?.words && user.words[group]) {
			for (let page in user.words[group]) {
				if (user.words[group].hasOwnProperty(page)) {
					crossedGroup[page] = getUserWordsChunk(group, page, {difficulty, deleted})
				}
			}
		}
		return crossedGroup
	}, [user, getUserWordsChunk])


	return {
		getUserWordsChunk,
		getUserWordsGroup,
	}
}



