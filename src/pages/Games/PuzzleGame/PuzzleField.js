import React, { useEffect, useRef, useState } from "react"
import classesCss from "../Games.module.scss"
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
	const [dragIntersectWord, setDragIntersectWord] = useState(null)

	function onWordSelectSuccess(index){
		const cards = [...words.cards]
		const cells = [...words.cells]
		const currentWordInCells = cells.findIndex(word => word.index === currentWord)
		cells[currentWordInCells] = {...cells[currentWordInCells], visible: true}
		cards.splice(index, 1)
		const nextInc = words.cells[currentWord+1].type === "symbol"? 2 : 1
		console.log(nextInc)
		setCurrentWord(currentWord + nextInc)
		setWords({cards, cells})


	}

	function onDrag(event){
		const cardRect = event.target.getBoundingClientRect()
		const crossedWord = words.cells.findIndex((cell, index) => {
			//we cant define children position one time in start, because this position depends on viewport,
			//so we have to calculate on the fly
			const cellRect = cellsRef.current.children[index].getBoundingClientRect()
			return checkCollision(cellRect, cardRect)
		})
		if (crossedWord+1) {
			if(crossedWord !== dragIntersectWord)
			setDragIntersectWord(crossedWord)
		} else if(dragIntersectWord !== null){
			setDragIntersectWord(null)
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
			const cards = []
			const cells = []
			textParts.forEach((word, index) => {
				cards.push({text: word[1], index})
				cells.push({type: "word", text: word[1], index, isFigured: false})
				if (word[2]) cells.push({type: "symbol", text: word[2], visible: false})
			})
			setWords({
				cards: shuffle(cards),
				cells,
			})
		}
	}, [text])


	console.log(words.cells[currentWord])

	return (
		<div className={classesCss.PuzzleField}>
			<div className={classesCss.PuzzleCellsWrap} ref={cellsRef}>
				{words.cells.map((el, index) => {
					if (el.type === "word") {
						return (
							<PuzzleCell
								className={"puzzle-cell"}
								word={el.text}
								index={el.index}
								key={"cell" + index + el.index}
								visible={el.visible}
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
			<div className={classesCss.PuzzleCardsWrap}>
				{
					words.cards.map((el, index) => {
						return (
							<PuzzleCard
								word={el.text}
								currentInterSectWord = {dragIntersectWord}
								onSelectSuccess={onWordSelectSuccess}
								index={index}
								correctWord={words.cells[currentWord]}
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