import React, { useEffect } from "react"
import classesCss from "./Games.module.scss"
import { useWordsGroup } from "../../hooks/hooks.words"

export default function PuzzleGame(){
	const {currentWordsGroup, getWordsGroup} = useWordsGroup()

	useEffect(() => {
		getWordsGroup(0)
	}, [getWordsGroup])

	console.log("inGame", currentWordsGroup)

	return (
		<div className={classesCss.PuzzleGame}>

		</div>
	)
}