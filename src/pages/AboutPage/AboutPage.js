import React from "react"
import cx from "classnames"
import CloseLink from "../../components/Buttons/CloseLink";
import SvgWave from "../../components/Effects/SvgWave";
import AboutCard from "../../components/AboutCard/AboutCard";
import { GAMES_ARRAY } from "../../settings/data";
import { WAVES } from "../../settings/waves";
import classesCss from "./AboutPage.module.scss"

const wavesColors = ["#ff8758", "#d43d1e"]

export default function AboutPage(){
  return (
    <div className={classesCss.AboutPage}>
      <CloseLink className={classesCss.CloseLink}/>
      <div className={cx(classesCss.Section, classesCss.Special)}>
        <div className={classesCss.Content}>
          <h2>Особенности</h2>
          <div className={classesCss.RowContent}>
            <div className={classesCss.CardsContainer}>
              <AboutCard
                image={"books.png"}
                head={"Узнавай новое"}
                text={"В учебнике собраны 3600 самых используемых в повседневной жизни слов, есть его определение и пример как на русском так и на английском!."}
              />
              <AboutCard
                image={"repeat.png"}
                head={"Повторяй"}
                text={"Все слова которые ты изучил попадают в твой личный словарь. Ты можешь отметить сложные для тебя" +
                " слова, чтобы знать, на что чаще обращать внимание!"}
              />
              <AboutCard
                image={"statistic.png"}
                head={"Следи за прогрессом"}
                text={"В личном кабинете ты можешь следить за своим прогрессом: сколько слов ты уже выучил всего и за каждый день."}
              />
            </div>
            <div className={classesCss.Asset}>
              <div style={{backgroundImage: `url(${process.env.PUBLIC_URL}/static/glass1.png)`,}}/>
            </div>

          </div>
        </div>


        <SvgWave
          colors={wavesColors}
          viewBox={"0 300 1920 1700"}
        >
          <path d={WAVES[0]}/>
        </SvgWave>

      </div>
      <div id={"games"} className={cx(classesCss.Section, classesCss.Games)}>
        <div className={classesCss.Content}>
          <h2>Игры</h2>
          <div className={classesCss.CardsContainer}>
            {
              GAMES_ARRAY.map(({navigationImage, name, description}) => {
                return(
                  <AboutCard
                    key={"aboutgame"+name}
                    image={navigationImage}
                    head={name}
                    text={description}
                  />
                )
              })
            }
          </div>
        </div>

        <SvgWave colors={wavesColors}>
          <path d={WAVES[1]}/>
        </SvgWave>

      </div>
    </div>)
}