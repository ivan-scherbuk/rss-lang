import React from "react"
import Button from "../Buttons/Button"


export default function AuthBlock({classes, className}){
		return(
				<div className={className}>
						<Button
								label={"Log In"}
								className={[classes.authButton, classes.loginButton].joun(" ")}
						/>
				</div>
		)
}