import React from "react"
import NavigationBar from "./components/Navigation/NavigationBar"
import AuthBlock from "./components/Navigation/AuthBlock"
import AuthForm from "./components/AuthForm/AuthForm"
import classes from "./styles/App.module.scss"

function App() {
	return (
		<div>
			<NavigationBar className={classes.Navigation}>
				<AuthBlock
					className={classes.AuthBlock}>
					<AuthForm />
				</AuthBlock>
			</NavigationBar>
		</div>
	)
}

export default App
