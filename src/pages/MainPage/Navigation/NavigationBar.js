import React from "react";
import cx from "classnames"
import { setFirstLetterToCapital } from "../../../helpers/gameUtils";
import AuthBlock from "./AuthBlock";
import AuthForm from "./AuthForm";
import BookButton from "../../../components/Buttons/BookButton";
import GameButton from "../../../components/Buttons/GameButton";
import classesCss from "./Navigation.module.scss";
import { GAMES_ARRAY } from "../../../settings/data";


export default function NavigationBar({className}) {

  return (
    <div className={cx(classesCss.Navigation, className)}>
      <AuthBlock><AuthForm/></AuthBlock>
      <BookButton className={cx(classesCss.BookButton)}/>
      {
        GAMES_ARRAY.map(game => {
          return(
            <GameButton
              key={game.name}
              game={game}
              className={cx(
                classesCss.BubbleButton,
                classesCss.GameButton,
                classesCss[setFirstLetterToCapital(game.key)])}
            />)
        })
      }
    </div>
  );
}
