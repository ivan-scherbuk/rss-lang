import React from "react"
import classesCss from "../../Games.module.scss"

export default function PuzzleCell({word, visible, className}){

	return (
		<div
			style={{width: `${word.length * 20}px`}}
			className={[classesCss.PuzzleCell, className].join(" ")}
		>
			{visible ? word : null}
		</div>
	)
}