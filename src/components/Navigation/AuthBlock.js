import React, { useState } from "react"
import Button from "../Buttons/Button"
import AuthModal from "../AuthForm/AuthModal"
import classesCss from './Navigation.module.scss'


export default function AuthBlock({children, classes, className, styles}) {

	const [modalIsOpen, setModalIsOpen] = useState(false)

	const modalClasses = [classes.modal, classesCss.AuthModal]
	const buttonClasses = [classes?.authButton, classes?.loginButton, classesCss.AuthButton]
	if(modalIsOpen) {
		modalClasses.push(classes.modalActive, classesCss.ModalActive)
		buttonClasses.push(classes.authButtonActive)

	}

	return (
		<div className={className}>
			<Button
				style={styles.authButton}
				label={"Войти"}
				className={buttonClasses.join(" ")}
				onClick={() => setModalIsOpen(!modalIsOpen)}
			/>
			<AuthModal
				onClose={() => setModalIsOpen(false)}
				className={modalClasses.join(" ")}
			>
				{children}
			</AuthModal>
		</div>
	)
}