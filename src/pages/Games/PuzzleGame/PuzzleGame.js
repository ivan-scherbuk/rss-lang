import React, { useEffect, useState } from "react"
import classesCss from "../Games.module.scss"
import { useTimerGenerator } from "../../../hooks/hooks.game"
import {getUserWordsChunk, createRandomChunkFromGroup, getUserWordsGroup } from "../../../helpers/utils.words"
import { useSelector } from "react-redux"
import PuzzleField from "./PuzzleField"
import {useUserWordUpdate, useUserWords} from "../../../hooks/hooks.user"
import {useWordsGroup} from "../../../hooks/hooks.words"

export default function PuzzleGame(){
	const [currentChunk, setCurrentChunk] = useState(null)
	const [currentWord, setCurrentWord] = useState(0)
	const words = useSelector(store => store.words)
	const user = useSelector(store => store.user)
	const {update, updatedWord} = useUserWordUpdate()
	const {currentWordsGroup, getWordsGroup, onGroupLoading} = useWordsGroup()
	const {currentUserWords, getUserWordsChunk} = useUserWords()

	const timer = useTimerGenerator(() => {
		setCurrentWord(currentWord + 1)
	}, 500, currentChunk && currentWord < currentChunk.length)


	useEffect(() => {
		if(currentWordsGroup){
			setCurrentChunk(createRandomChunkFromGroup(currentWordsGroup))
		}

	}, [currentWordsGroup])

	useEffect(() => {
		console.log(updatedWord)
	}, [updatedWord])

	useEffect(() => {
		console.log(currentUserWords)
	}, [currentUserWords])

	useEffect(() => {
		getWordsGroup(3)
		//getUserWordsChunk(4,2)
	}, [])

	useEffect(() => {
		if(user.words){
			getUserWordsChunk(1,5, {deleted:false})
		}
	}, [user.words])


	return (
		<div className={classesCss.PuzzleGame}>
			{
				currentChunk && currentWord+1 <= currentChunk.length ?
					(
						<>
							<div>
								<span>{currentChunk[currentWord].word}</span>
							</div>
							<div>
								<span>{currentChunk[currentWord].textExampleTranslate} {currentChunk[currentWord].textExample}</span>
							</div>
							<button onClick={async () => {
								//console.log(currentChunk[currentWord])
								update(currentChunk[currentWord])

								//await dispatch(addUserWord(currentChunk[currentWord]))
								timer.reset()
							}}>RESET
							</button>
							<PuzzleField text={currentChunk[currentWord].textExample}/>
						</>
					) : <div>ЗАГРУЗКА</div>
			}
		</div>
	)
}