import React from "react"
import classesCss from "./styles/MainPage.module.scss"


export default function MainPage(){

	const girlStyle = {
		backgroundImage: `url(${process.env.PUBLIC_URL}/static/girl.png)`,
	}

	return (
		<div className={classesCss.MainPage}>
			<div className={classesCss.Bg}>
				<div className={classesCss.Girl}>
					<div style={girlStyle}/>
				</div>
			</div>
		</div>
	)
}