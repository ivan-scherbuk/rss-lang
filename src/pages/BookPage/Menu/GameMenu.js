import React, { useState } from "react";
import classesCss from "../BookPage.module.scss";
import Button from "../../../components/Buttons/Button";
import { GAMES_ARRAY } from "../../Games/gamesData";
import GameButton from "../../../components/Buttons/GameButton";
import cx from "classnames";
import { setFirstLetterToCapital } from "../../../helpers/gameUtils";
import { useSelector } from "react-redux";
import { MODE_VOCABULARY, VOCABULARY_MODE_DIFFICULT, WORD_HARD } from "../../../settings";

export default function GameMenu({className}){
  const [isOpen, setIsOpen] = useState(false);
  const {currentWords, mode, vocabularyMode} = useSelector(store => store.book)

  const wordsToTransmit = (function(){
    if(mode === MODE_VOCABULARY && vocabularyMode === VOCABULARY_MODE_DIFFICULT) {
      return currentWords.filter(({optional, difficulty}) => !optional?.deleted && difficulty === WORD_HARD)
    }
    return currentWords.filter(({optional}) => !optional?.deleted)
  })()

  return (
    <div className={classesCss.GameMenu}>
      <Button
        className={cx(classesCss.NavigationLink, classesCss.GameMenuToggler)}
        onClick={() => setIsOpen(!isOpen)}
        label={"Тренировка"}
      />
      <div
        className={cx(classesCss.PopUpMenu, {[classesCss.Active]: isOpen})}
      >
        {GAMES_ARRAY.map((game) => {
          return (
            <GameButton
              gameCallValues={{words: wordsToTransmit}}
              game={game}
              key={game.key}
              className={classesCss.GameLink}
              classes={{
                label: classesCss.GameLabel,
                link: cx(
                  classesCss.GameLinkWrap,
                  classesCss[setFirstLetterToCapital(game.key)],
                ),
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
