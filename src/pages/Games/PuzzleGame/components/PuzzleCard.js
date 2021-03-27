import React from "react"
import classesCss from '../../Games.module.scss'

export default function PuzzleCard({word, index, onSelect}){
	return (
		<div
			className={classesCss.PuzzleCard}
		>
			{word}
		</div>
	)
}