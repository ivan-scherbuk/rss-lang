import React, { useState } from "react"
import Button from "../Buttons/Button"
import Modal from "react-modal"


export default function AuthBlock({children, classes, className}) {

	const [modalIsOpen, setModalIsOpen] = useState(false)


	return (
		<div className={className}>
			<Button
				label={"Log In"}
				className={[classes?.authButton, classes?.loginButton].join(" ")}
				onClick={() => setModalIsOpen(true)}
			/>
			<Modal
				isOpen={modalIsOpen}
				ariaHideApp={false}
				onRequestClose={() => setModalIsOpen(false)}
				shouldCloseOnOverlayClick={true}
			>
				{children}
			</Modal>
		</div>
	)
}