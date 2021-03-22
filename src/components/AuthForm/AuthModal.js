import React from 'react'
import Button from "../Buttons/Button"

export default function AuthModal({children, className, style, onClose}){
	return(
		<div
			style={style}
			className={className}
		>
			{children}
			<Button
				onClick={onClose}
				label={"X"}
			/>
		</div>
	)
}