import React from "react"
import classesCss from '../PuzzleGame.module.scss'

export default function Symbol({symbol}){
	return(
		<div className={classesCss.Symbol}><span>{symbol} </span></div>
	)
}