import React from "react"
import classesCss from "./BookPage.module.scss";

export default function BookDisclaimerEmpty(){
  return(
    <div className={classesCss.DisclaimerBlock}>
      <div
        className={classesCss.Image}
        style={{backgroundImage: `url(${process.env.PUBLIC_URL}/static/nothing.png)`,}}
      />
      <div className={classesCss.Text}><span>Здесь пока ничего нет</span></div>
    </div>
  )
}