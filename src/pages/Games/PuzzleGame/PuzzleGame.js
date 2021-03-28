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
	const [currentPage, setCurrentPage] = useState(0)

	const timer = useTimerGenerator(() => {
		console.log(12345)
		setCurrentWord(currentWord + 1)
		setCountdown(50)
	}, 60 * 1000, currentChunk && currentWord < currentChunk.length && false, 250)



	function onSuccessAssembly(){
		timer.reset()
	}

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
		if(user.words && currentPage <30){
			getUserWordsChunk(1,currentPage, {deleted:false})
		}
	}, [user.words, getUserWordsChunk, currentPage])

	useEffect(() => {
		if(currentWord >= 19){
			setCurrentPage(currentPage + 1)
			setCurrentWord(0)
		}
	}, [currentPage, currentWord])


	console.log(currentWord)

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
							<PuzzleField
								text={currentChunk[currentWord].textExample}
								onSuccess={onSuccessAssembly}
							/>
						</>
					) : <div>ЗАГРУЗКА</div>
			}
		</div>
	)
}