import React from "react"
import classesCss from "./Button.module.scss"

export default function Button({onClick, label, disabled, className}){
	return(
		<button
			onClick={onClick}
			disabled={disabled}
			className={[classesCss.Button, className].join(" ")}
		>
			{label}
		</button>
	)
}