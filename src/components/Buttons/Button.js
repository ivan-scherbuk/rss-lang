import React from "react"
import classesCss from "./Button.module.scss"

export default function Button(props){
	return(
		<button
      {...props}
			className={[classesCss.Button, props.className].join(" ")}
		>
			{props.label}
		</button>
	)
}