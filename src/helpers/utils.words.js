import { getRandomNumber } from "./gameUtils"

export function createRandomChunkFromGroup(group, length = 20){
	const chunk = []
	const groupLength = Object.keys(group).length
	while (chunk.length < length) {
		const randChunk = group[getRandomNumber(0, groupLength - 1)]
		const randomWord = randChunk[getRandomNumber(0, randChunk.length - 1)]
		if (chunk.findIndex(word => word.id === randomWord.id) === -1) {
			chunk.push({...randomWord})
		}
	}
	return chunk
}

export function getUserWordsChunk(chunk, userChunk, {difficulty, deleted} = {}){
	if (userChunk.length > 0) {
		let filteredWords = [...userChunk]
		if (typeof deleted === "boolean") {
			filteredWords = filteredWords.filter(({optional}) => Boolean(optional.deleted) === deleted)
		}
		if (difficulty) {
			filteredWords = filteredWords.filter((word) => word.difficulty === difficulty)
		}
		return chunk.map(el => {
			const userWord = filteredWords.find(({wordId}) => wordId === el.id)
			if (userWord) {
				return {...el, difficulty: userWord.difficulty, optional: userWord.optional, userWord:true}
			}
			return el
		}).filter(el => el.userWord)
	}
	return []
}

export function getUserWordsGroup(group, userGroup, {difficulty, deleted} = {}){
	const crossedGroup = {}
	if (userGroup) {
		for (let page in userGroup) {
			if (userGroup.hasOwnProperty(page)) {
				crossedGroup[page] = getUserWordsChunk(group[page], userGroup[page], {difficulty, deleted})
			}
		}
	}
	return crossedGroup
}
