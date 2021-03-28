import React, { useEffect, useRef, useState } from "react"
import classesCss from "./PuzzleGame.module.scss"
import PuzzleCell from "./components/PuzzleCell"
import Symbol from "./components/Symbol"
import PuzzleCard from "./components/PuzzleCard"
import { checkCollision, shuffle } from "../../../helpers/gameUtils"

//сделать маркер текущего слова
//при нажатии на слово из происходит сравнение с со словом по индексу текущего маркера если он верное
//  то в первом массиве слово исчезает а во втором появляетсяlas флаг visible маркер увеличивается
// Business was <b>worse</b> this, month than t, month.
// Business was worse this, month than last, month.
export default function PuzzleField({text, onSuccess}){
	const [currentWord, setCurrentWord] = useState(0)
	const [words, setWords] = useState({
		cards: [],
		cells: [],
	})
	const cellsRef = useRef(null)
	const [currentIntersectWord, setCurrentIntersectWord] = useState(null)

	function onSuccessSelect(index){
		const cards = [...words.cards]
		const cells = [...words.cells]
		cells[currentWord] = {...cells[currentWord], visible: true}
		cards.splice(index, 1)
		let nextInc = 1
		console.log(words.cells[currentWord + nextInc])
		while (words.cells[currentWord + nextInc]
		&& (words.cells[currentWord + nextInc].type === "symbol"
			|| words.cells[currentWord + nextInc].visible)) {
			nextInc++
		}
		setCurrentWord(currentWord + nextInc)
		setWords({cards, cells})
	}

	function wordSelectHandler(index){

	}

	function onClickWordSelectHandler(index){
		if (words.cells[currentWord].text === words.cards[index].text) onSuccessSelect(index)
	}

	function onDragWordSelectHandler(index){
		if (currentIntersectWord === currentWord) {
			onClickWordSelectHandler(index)
		} else if (
			currentIntersectWord !== null
			&& !words.cells[currentIntersectWord].visible
			&& words.cells[currentIntersectWord].text === words.cards[index].text){
			const cards = [...words.cards]
			const cells = [...words.cells]
			cells[currentIntersectWord] = {...cells[currentIntersectWord], visible: true}
			cards.splice(index, 1)
			setWords({cards, cells})
		}
		if (currentIntersectWord !== null) setCurrentIntersectWord(null)
	}

	function onDrag(event){
		const cardRect = event.target.getBoundingClientRect()
		const crossedWord = words.cells.findIndex((cell, index) => {
			//we cant define children position one time in start, because this position depends on viewport,
			//so we have to calculate on the fly
			if(cell.type === "symbol") return false
			const cellRect = cellsRef.current.children[index].getBoundingClientRect()
			return checkCollision(cellRect, cardRect)
		})
		if (crossedWord + 1) {
			if (crossedWord !== currentIntersectWord)
				setCurrentIntersectWord(crossedWord)
		} else if (currentIntersectWord !== null) {
			setCurrentIntersectWord(null)
		}
	}

	useEffect(() => {

		if (words.cards.length <= 0 && currentWord > 0) {
			onSuccess()
		}
	}, [words.cards.length])

	useEffect(() => {
		if (text) {
			setCurrentWord(0)
			const textWOTags = text.replace(/<\/?\w+>/g, "")
			const textParts = [...textWOTags.matchAll(/((?:the |a |in |to |on )*[\w’]+(?: \w\.)?)+([.;,+"\-:]+)*/gi)]
			const cells = textParts.reduce((result, elem, index) => {
				result.push({
					type: "text",
					text: elem[1],
					index,
				})
				if (elem[2]) result.push({
					type: "symbol",
					text: elem[2],
				})
				return result
			}, [])
			const cards = cells.filter(el => el.type === "text")
			setWords({
				cards: shuffle(cards),
				cells,
			})
		}
	}, [text])

	return (
		<div className={classesCss.PuzzleField}>
			<div className={classesCss.PuzzlePieceWrap} ref={cellsRef}>
				{words.cells.map((el, index) => {
					if (el.type === "text") {
						return (
							<PuzzleCell
								word={el}
								hovered={index === currentIntersectWord}
								key={"cell" + index + el.index}
							/>
						)
					} else {
						return (
							<Symbol
								symbol={el.text}
								key={"symbol" + el.text + index}
							/>
						)
					}

				})}
			</div>
			<div className={classesCss.PuzzlePieceWrap}>
				{words.cards.map((el, index) => {
					return (
						<PuzzleCard
							word={el}
							index={index}
							onClickWordSelect={onClickWordSelectHandler}
							onDragWordSelect={onDragWordSelectHandler}
							onDrag={onDrag}
							key={"card" + el.index + index}
						/>
					)
				})
				}
			</div>
		</div>
	)
}