import React from "react"
import classesCss from "./Button.module.scss"

export default function Button({label, className}){
		return(
				<button className={[classesCss.Button, className].join(" ")}>
						{label}
				</button>
		)
}