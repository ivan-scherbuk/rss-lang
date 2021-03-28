import React, {useState} from "react"
import classesCss from '../../Games.module.scss'
import {motion} from "framer-motion"

export default function PuzzleCard({word, index, onSelectSuccess, correctWord, onDrag}){

	const [onDragFlag, setOnDragFlag] = useState(false)



	function onClickHandler(){
		if(correctWord.text === word){
			onSelectSuccess(index)
		}
	}

	return (
		<motion.div
			drag
			dragConstraints={{
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			}}
			dragElastic={1}
			onClick={() => {
				if(!onDragFlag){
					onClickHandler()
				} else {
					setOnDragFlag(false)
				}
			}}
			onDrag={onDrag}
			onDragStart={() => setOnDragFlag(true)}
			className={classesCss.PuzzleCard}
		>
			{word}
		</motion.div>
	)
}