import React, { useState } from "react"
import Button from "../Buttons/Button"
import AuthModal from "../AuthForm/AuthModal"
import classesCss from './Navigation.module.scss'
import Avatar from "@material-ui/core/Avatar"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../../redux/actions"


export default function AuthBlock({children, classes, className, styles}) {

	const {isLogged, email} = useSelector(state => state.user)
	const dispatch = useDispatch()
	const [modalIsOpen, setModalIsOpen] = useState(false)

	const modalClasses = [classes.modal, classesCss.AuthModal]
	const buttonClasses = [classes?.authButton, classes?.loginButton, classesCss.AuthButton]
	if(modalIsOpen && !isLogged) {
		modalClasses.push(classes.modalActive, classesCss.ModalActive)
		buttonClasses.push(classes.authButtonActive)
	}

	return (
		<div className={className}>
			{
				!isLogged
				? <Button
					style={styles.authButton}
					label={"Войти"}
					className={buttonClasses.join(" ")}
					onClick={() => setModalIsOpen(!modalIsOpen)}
				/>
				: <Avatar
						className={classes.avatar}
						alt={email.toUpperCase()}
						onClick = {() => dispatch(logOut())}
					/>
			}
			<AuthModal
				onClose={() => setModalIsOpen(false)}
				className={modalClasses.join(" ")}
			>
				{children}
			</AuthModal>
		</div>
	)
}