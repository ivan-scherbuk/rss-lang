import React, { useEffect, useRef, useState } from "react"
import classesCss from "./PuzzleGame.module.scss"
import PuzzleCell from "./components/PuzzleCell"
import Symbol from "./components/Symbol"
import PuzzleCard from "./components/PuzzleCard"
import { checkCollision, shuffle } from "../../../helpers/gameUtils"
import { useTimer } from "../../../hooks/hooks.game";


export default function PuzzleField({text, onSuccess, onWrongSelect, autoComplete}){
  const [currentIntersectWord, setCurrentIntersectWord] = useState(null)
  const [currentWord, setCurrentWord] = useState(0)
	const [words, setWords] = useState({
		cards: [],
		cells: [],
	})
	const cellsRef = useRef(null)

	function onSuccessSelect(index, correctWordIndex = currentWord){
		const cards = [...words.cards]
		const cells = [...words.cells]
		cells[correctWordIndex] = {...cells[correctWordIndex], visible: true}
		cards.splice(index, 1)
    if(correctWordIndex === currentWord){
      let nextInc = 1
      while (words.cells[currentWord + nextInc]
      && (words.cells[currentWord + nextInc].type === "symbol"
        || words.cells[currentWord + nextInc].visible)) {
        nextInc++
      }
      setCurrentWord(currentWord + nextInc)
    }
		setWords({cards, cells})
	}

  function onClickWordSelect(index){
    if (words.cells[currentWord].text === words.cards[index].text) onSuccessSelect(index)
    else onWrongSelect()
  }

  function onDragWordSelect(index){
    if (currentIntersectWord === currentWord) {
      onClickWordSelect(index)
    } else if(currentIntersectWord !== null){
      if(!words.cells[currentIntersectWord].visible){
        if(words.cells[currentIntersectWord].text === words.cards[index].text){
          onSuccessSelect(index, currentIntersectWord)
        } else {
          onWrongSelect()
        }
      }
      setCurrentIntersectWord(null)
    }
  }

	function onDragCheckIntersection(event){
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

  useTimer(() => {
    const correctWordInCards = words.cards.findIndex(el => {
      return el.text === words.cells[currentWord].text
    })
    onSuccessSelect(correctWordInCards)
  }, 400, autoComplete)

	useEffect(() => {
		if (words.cards.length <= 0 && currentWord > 0) {
		  if(autoComplete){
		    const timeout = setTimeout(() => {
          onSuccess()
        }, 2000)
        return(() => clearTimeout(timeout))
      } else {
        onSuccess()
      }
		}
    //if add onSuccess function it will work incorrect because onSuccess set Autocomplete so
    //it call change in PuzzleField, but words stack are still 0, so it calls
    //onSuccess function one more time
	}, [words.cards.length])

	useEffect(() => {
		if (text) {
			setCurrentWord(0)
			const textWOTags = text.replace(/<\/?\w+>/g, "")
			const textParts = [...textWOTags.matchAll(/((?:the |a |in |to |on )*(?:[\w’])+(?: \w\.)?)+([.;,+"\-:]+)*/gi)]
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
							onClickWordSelect={onClickWordSelect}
							onDragWordSelect={onDragWordSelect}
							onDrag={onDragCheckIntersection}
							key={"card" + el.index + index}
						/>
					)
				})
				}
			</div>
		</div>
	)
}