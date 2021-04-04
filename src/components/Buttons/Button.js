import React from "react"
import classesCss from "./Button.module.scss"
import cx from "classnames"

export default function Button({label, className, ...props}){
	return(
		<button
      {...props}
			className={cx(classesCss.Button, className)}
		>
			{label}
		</button>
	)
}