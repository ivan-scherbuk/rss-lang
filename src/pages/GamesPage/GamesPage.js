import React from "react";
import { Link, useLocation } from "react-router-dom";
import CloseLink from "../../components/Buttons/CloseLink";
import AboutCard from "../../components/AboutCard/AboutCard";
import { GAMES_ARRAY } from "../../settings/data";
import classesCss from "./GamesPage.module.scss";

export default function GamesPage(){

  const {state} = useLocation()

  return (
    <div className={classesCss.GamesPage}>
      <CloseLink className={classesCss.CloseLink}/>
      {
        GAMES_ARRAY.map(({navigationImage, name, description, key}) => {
          return (
            <Link to={{pathname: `/games/${key}`, state}}>
              <AboutCard
                className={classesCss.GameCard}
                key={"aboutgame" + name}
                image={navigationImage}
                head={name}
                text={description}
              />
            </Link>
          )
        })
      }
    </div>
  )
}