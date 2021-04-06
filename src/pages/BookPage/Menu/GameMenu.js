import React, { useEffect, useState } from "react";
import classesCss from "../BookPage.module.scss";
import Button from "../../../components/Buttons/Button";
import { GAMES_ARRAY } from "../../Games/gamesData";
import GameButton from "../../../components/Buttons/GameButton";
import cx from "classnames";
import { setFirstLetterToCapital } from "../../../helpers/gameUtils";

export default function GameMenu({ className, gameCallValues, groupPath }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classesCss.GameMenu}>
      {(groupPath.includes("difficult") || groupPath.includes("book")) && (
        <Button
          className={cx(classesCss.NavigationLink, classesCss.GameMenuToggler)}
          onClick={() => setIsOpen(!isOpen)}
          label={"Тренировка"}
        />
      )}
      <div
        className={cx(classesCss.PopUpMenu, { [classesCss.Active]: isOpen })}
      >
        {GAMES_ARRAY.map((game) => {
          return (
            <GameButton
              gameCallValues={gameCallValues}
              game={game}
              key={game.key}
              className={classesCss.GameLink}
              classes={{
                label: classesCss.GameLabel,
                link: cx(
                  classesCss.GameLinkWrap,
                  classesCss[setFirstLetterToCapital(game.key)]
                ),
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
