import React, {useState} from "react"
import classesCss from '../PuzzleGame.module.scss'
import {motion} from "framer-motion"
import cx from "classnames"

export default function PuzzleCard({word, index, onClickWordSelect, onDragWordSelect, onDrag}){

	const [onDragFlag, setOnDragFlag] = useState(false)

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
					onClickWordSelect(index)
				} else {
					setOnDragFlag(false)
				}
			}}
			onDrag={onDrag}
			onDragStart={() => setOnDragFlag(true)}
			onDragEnd={() => onDragWordSelect(index)}
			className={cx(classesCss.PuzzlePiece, classesCss.PuzzleCard)}
		>
			{word.text}
		</motion.div>
	)
}