import React from "react"
import classesCss from "./MainPage.module.scss"
import "../../styles/effect.scss"
import Footer from "./Footer";
import NavigationBar from "./Navigation/NavigationBar";


export default function MainPage(){

  const girlStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/static/girl.png)`,
  }

  return (
    <div className={[classesCss.MainPage, "main-page"].join(" ")}>
      <div className={classesCss.Bg}>

        <div className={[classesCss.Wave, "wave"].join(" ")}>
          <NavigationBar/>
        </div>
        <div className={[classesCss.Girl, "girl"].join(" ")}>
          <div style={girlStyle}/>
        </div>
        <Footer />
      </div>
    </div>
  )
}
