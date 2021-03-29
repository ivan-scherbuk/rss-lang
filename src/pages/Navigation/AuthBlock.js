import React, { useState } from "react"
import Button from "../../components/Buttons/Button"
import AuthModal from "../../components/AuthForm/AuthModal"
import classesCss from './Navigation.module.scss'
import Avatar from "@material-ui/core/Avatar"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"


export default function AuthBlock({children, classes, className, styles}) {

	const {isLogged, email} = useSelector(state => state.user)
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
				:
          <NavLink
            className={classes.avatar}
            to="/statistic">
            <Avatar

						alt={email.toUpperCase()}
            src={'url()'}
					/>
          </NavLink>
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