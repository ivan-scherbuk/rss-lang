import React from "react"
import classesCss from "./style/Input.module.scss"

export default function Input(props) {

	const {
		autoComplete,
		blockStyle,
		className,
		dataAttr,
		id,
		label,
		name,
		onChange,
		placeholder,
		type,
		style,
		value,
	} = props

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
				autoComplete={autoComplete}
				style={style}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				{...dataProps}
			/>
		</div>
	)
}