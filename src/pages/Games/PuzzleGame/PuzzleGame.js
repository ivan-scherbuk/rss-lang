import React, { useEffect, useState } from "react"
import classesCss from "../Games.module.scss"
import { useTimer, useTimerGenerator } from "../../../hooks/hooks.game"
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
	const {currentWordsGroup, getWordsGroup} = useWordsGroup()
	const {currentUserWords, getUserWordsChunk} = useUserWords()
	const [countdown, setCountdown] = useState(50)

	const timer = useTimerGenerator(() => {
		setCurrentWord(currentWord + 1)
		setCountdown(50)
	}, 50000, currentChunk && currentWord < currentChunk.length, 250)

	// useTimer(() => {
	// 	console.log(111)
	// 	setCountdown(state => state - 1)
	// }, 1000, !!currentChunk && currentWord < currentChunk.length && countdown > 0, currentChunk)


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
							<div className={classesCss.CurrentWord}>
								<div className={classesCss.Word}><h3>{currentChunk[currentWord].word}</h3></div>
								<div className={classesCss.Countdown}>{countdown >=0 ? countdown : 0}</div>
							</div>
							<div className={classesCss.Translation}>
								<span>{currentChunk[currentWord].textExampleTranslate}</span>
							</div>
							<PuzzleField text={currentChunk[currentWord].textExample}/>
						</>
					) : <div>ЗАГРУЗКА</div>
			}
		</div>
	)
}