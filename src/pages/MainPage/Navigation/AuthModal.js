import React from 'react'
import CloseButton from "../../../components/Buttons/CloseButton";
import classesCss from "./Navigation.module.scss"

export default function AuthModal({children, className, style, onClose}){
	return(
		<div
			style={style}
			className={className}
		>
      <h3>Привет!</h3>
			{children}
			<CloseButton
				onClick={onClose}
        className={classesCss.CloseButton}
			/>
		</div>
	)
}