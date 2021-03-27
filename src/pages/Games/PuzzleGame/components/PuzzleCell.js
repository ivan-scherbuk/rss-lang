import React from 'react'
import classesCss from '../../Games.module.scss'

export default function PuzzleCell({word}){
	console.log(word)
	return(
		<div style={{width: `${word.length * 20}px`}} className={classesCss.PuzzleCell}>
		</div>
	)
}