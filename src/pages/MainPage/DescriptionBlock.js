import React from "react"
import classesCss from "./MainPage.module.scss"
import cx from "classnames"
import { Link } from "react-router-dom";
import LearnMoreButton from "../../components/Buttons/LearnMoreButton";

export default function DescriptionBlock(){

  return (
    <div className={classesCss.DescriptionBlock}>
      <div className={classesCss.SlideBlock}>
        <div className={cx(
          classesCss.Slide,
          classesCss.Active,
        )}>
          <h2>RSLang</h2>
          <Link className={classesCss.LearnMoreLink} to={{pathname:"/about"}}>
            <LearnMoreButton/>
          </Link>
          <p>
            Теперь учить английский язык легко и увлекательно! Играйте в мини-игры и учите запоминайте слова.
            Словарь содержит все слова, которые раньше встречались в играх.
            Повторяйте их каждый день для закрепления результата.
          </p>
        </div>
      </div>
    </div>
  )
}