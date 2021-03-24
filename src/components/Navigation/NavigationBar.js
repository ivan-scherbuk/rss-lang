import React from "react"
import { NavLink, useLocation } from "react-router-dom"
import AuthBlock from "./AuthBlock"
import AuthForm from "../AuthForm/AuthForm"
import Button from "../Buttons/Button"
import classesCss from "./Navigation.module.scss"

export default function NavigationBar(){

	const location = useLocation()
	const navigationClasses = [classesCss.Navigation]
	if(location.pathname === "/") navigationClasses.push(classesCss.NavigationCloud)

	return (
		<div className={navigationClasses.join(' ')}>
			<AuthBlock
				className={classesCss.AuthBlock}
				classes={{
					authButton: classesCss.BubbleButton,
					authButtonActive: classesCss.Active,
					loginButton: classesCss.LoginButton,
					modal: classesCss.AuthModal,
					modalActive: classesCss.Active,
					avatar: classesCss.Avatar,
				}}
				styles={{
					authButton: {
						backgroundImage: `url(${process.env.PUBLIC_URL}/static/register2.jpg)`,
					},
				}}
			>
				<AuthForm/>
			</AuthBlock>
			<NavLink to="/statistic">
				<Button
					label={"Статистика"}
					style={{
						backgroundImage: `url(${process.env.PUBLIC_URL}/static/statistic.jpg)`,
					}}
					className={[
						classesCss.BubbleButton,
						classesCss.StatisticButton,
					].join(" ")}
				/>
			</NavLink>
			<NavLink to="/book">
				<Button
					label={"Учебник"}
					style={{
						backgroundImage: `url(${process.env.PUBLIC_URL}/static/book.webp)`,
					}}
					className={[
						classesCss.BubbleButton,
						classesCss.BookButton,
					].join(" ")}
				/>
			</NavLink>
			<NavLink to="/games/savannah">
				<Button
					label={"Саванна"}
					style={{
						backgroundImage: `url(${process.env.PUBLIC_URL}/static/savannah.jpg)`,
					}}
					className={[
						classesCss.BubbleButton,
						classesCss.GameButton,
						classesCss.Savannah,
					].join(" ")}
				/>
			</NavLink>
			<NavLink to="/games/audiocall">
				<Button
					label={"Аудио-вызов"}
					style={{
						backgroundImage: `url(${process.env.PUBLIC_URL}/static/audio.jpg)`,
					}}
					className={[
						classesCss.BubbleButton,
						classesCss.GameButton,
						classesCss.Audio,
					].join(" ")}
				/>
			</NavLink>
			<NavLink to="/games/sprint">
				<Button
					label={"Спринт"}
					style={{
						backgroundImage: `url(${process.env.PUBLIC_URL}/static/sprint.jpg)`,
					}}
					className={[
						classesCss.BubbleButton,
						classesCss.GameButton,
						classesCss.Sprint,
					].join(" ")}
				/>
			</NavLink>
			<NavLink to="/games/game">
				<Button
					label={"Игра"}
					style={{
						backgroundImage: `url(${process.env.PUBLIC_URL}/static/book.webp)`,
					}}
					className={[
						classesCss.BubbleButton,
						classesCss.GameButton,
						classesCss.Game,
					].join(" ")}
				/>
			</NavLink>
		</div>
	)
}

