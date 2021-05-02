import React from "react"
import classesCss from "./style/Input.module.scss"

export default function Input({blockStyle, className, dataAttr, id, label, name, ...props}) {

	const dataProps = {}
	for (let attrName in dataAttr) {
		if (dataAttr.hasOwnProperty(attrName))
			dataProps[ `data-${attrName}` ] = dataAttr[ attrName ]
	}

	return (
		<div
			style={blockStyle}
			className={[classesCss.InputBlock, className].join(" ")}>
			<label htmlFor={id || `inputId${name}`}>{label}</label>
			<input
				id={id || `inputId${name}`}
        name={name}

        {...props}
				{...dataProps}
			/>
		</div>
	)
}