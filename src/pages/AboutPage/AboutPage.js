import React from "react"
import {useLocation} from "react-router-dom"
import cx from "classnames"
import { WAVES } from "./waves";
import classesCss from "./AboutPage.module.scss"
import SvgWave from "../../components/Effects/SvgWave";
import AboutCard from "./AboutCard";
import { GAMES_ARRAY } from "../Games/gamesData";
import Footer from "../MainPage/Footer";
import CloseLink from "../../components/Buttons/CloseLink";

export default function AboutPage(){

  const location = useLocation()
  console.log(location)

  // function scrollTo(hash) {
  //   location.hash = "#" + hash;
  // }

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
          colors={["#ff8758", "#d43d1e"]}
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

        <SvgWave colors={["#ff8758", "#d43d1e"]}>
          <path d={WAVES[1]}/>
        </SvgWave>

      </div>
      <div id={"team"} className={cx(classesCss.Section, classesCss.Team)}>
        <div className={classesCss.Content}>
          <h2>Наша команда</h2>
          <div className={classesCss.RowContent}>
            <div className={classesCss.Asset}>
              <div style={{backgroundImage: `url(${process.env.PUBLIC_URL}/static/team.png)`,}}/>
            </div>
            <div className={classesCss.CardsContainer}>
              <AboutCard
                className={classesCss.CardImageRound}
                image={"anton.jpg"}
                head={"Антон"}
                text={"Тимлид, разработал архитектуру приложения и руководил командой. Разработал дизайн приложения, настроил аутентификацию, участвовал в разработке учебника, разработал игру Пазл."}
              />
              <AboutCard
                className={classesCss.CardImageBottomRound}
                image={"ann.png"}
                head={"Анна"}
                text={"Разработала игры Саванна и Спринт, сделала страницу статистики"}
              />
              <AboutCard
                className={classesCss.CardImageBottomRound}
                image={"van.png"}
                head={"Иван"}
                text={"Разработал страницы словаря и учебника, написал Unit-тесты"}
              />
              <AboutCard
                className={classesCss.CardImageRound}
                image={"tn.png"}
                head={"Татьяна"}
                text={"Сделала игру Аудиовызов, написала логику для карточек слов."}
              />
            </div>

          </div>
        </div>
        <SvgWave colors={["#ff8758", "#d43d1e"]}>
          <path d={WAVES[2]}/>
        </SvgWave>
      </div>
      {/*<div className={cx(classesCss.Section, classesCss.Instructions)}>*/}
      {/*  <div className={classesCss.Content}>*/}
      {/*    <h2>Инструкция</h2>*/}
      {/*  </div>*/}
      {/*  <SvgWave colors={["#ff8758", "#d43d1e"]}>*/}
      {/*    <path d={WAVES[4]}/>*/}
      {/*  </SvgWave>*/}
      {/*</div>*/}
      <Footer />
    </div>)
}