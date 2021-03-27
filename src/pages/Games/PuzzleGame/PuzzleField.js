import React, { useEffect, useState } from "react"
import classesCss from "../Games.module.scss"
import PuzzleCell from "./components/PuzzleCell"
import Symbol from "./components/Symbol"
import PuzzleCard from "./components/PuzzleCard"
import {shuffle} from "../../../helpers/gameUtils"

//сделать маркер текущего слова
//при нажатии на слово из происходит сравнение с со словом по индексу текущего маркера если он верное
//  то в первом массиве слово исчезает а во втором появляетсяlas флаг visible маркер увеличивается
// Business was <b>worse</b> this, month than t, month.
// Business was worse this, month than last, month.
export default function PuzzleField({text}){

	const [renderSet, setRenderSet] = useState([])
	const [wordsSet, setWords] = useState([])
	const [currentWord, setCurrentWord] = useState(0)

	useEffect(() => {
		if (text) {
			const textWOTags = text.replace(/<\/?\w+>/g, "")
			const textParts = [...textWOTags.matchAll(/((?:the |a |in |to |on )*(?:[\w'])+)+([.;,+"\-:]+)*/gi)]
			const render = []
			const words = []
			textParts.forEach((word, index) => {
				words.push({text: word[1], index})
				render.push({type: "word", text: word[1], index, isFigured: false})
				if (word[2]) render.push({type: "symbol", text: word[2]})
			})
			setRenderSet(render)
			setWords(shuffle(words))
		}
	}, [text])


	return (
		<div className={classesCss.PuzzleField}>
			<div className={classesCss.PuzzleCellsWrap}>
				{renderSet.map((el, index) => {
					if (el.type === "word") {
						return (
							<PuzzleCell
								word={el.text}
								index={index}
							/>
						)
					} else {
						return (
							<Symbol
								symbol={el.text}
							/>
						)
					}

				})}
			</div>
			<div className={classesCss.PuzzleCardsWrap}>
				{
					wordsSet.map((el, index) => {
						return (
							<PuzzleCard word={el.text}/>
							)
					})
				}
			</div>
		</div>
	)
}