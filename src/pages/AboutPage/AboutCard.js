import React from "react"
import cx from "classnames"
import classesCss from "./AboutPage.module.scss";

export default function AboutCard({image, head, text, className, ...props}){
  return(
    <div className={cx(classesCss.Card, className)} {...props}>
      <div className={classesCss.CardImage}>
        <div style={{backgroundImage: `url(${process.env.PUBLIC_URL}/static/${image})`}}/>
      </div>
      <div className={classesCss.CardText}>
        <header>
          <h3>{head}</h3>
        </header>
        <p>
          {text}
        </p>
      </div>
    </div>
  )
}