import React from "react"
import classesCss from "../PuzzleGame.module.scss"
import cx from "classnames"

export default function PuzzleCell({word: {index, text, visible}, hovered}){

	const style = {}
	if (!visible) style.width = `${text.length * 20}px`

	const classes = cx(
		{
			[classesCss.Hovered]: hovered,
			[classesCss.Selected]: visible,
		},
		classesCss.PuzzlePiece,
		classesCss.PuzzleCell)

	return (
		<div
			style={style}
			className={classes}
		>
			{visible ? text : null}
		</div>
	)
}