import React, { useState } from "react";
import classesCss from "../BookPage.module.scss";
import Pagination from "./Pagination";
import GroupMenu from "./GroupMenu";
import { useSelector } from "react-redux";
import Button from "../../../components/Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faHome } from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import GameMenu from "./GameMenu";
import { MODE_BOOK, MODE_VOCABULARY, VOCABULARY_MODE_DIFFICULT, VOCABULARY_MODE_NORMAL } from "../../../settings";

export default function BookMenu({settingsOn, totalPagesCount, setTotalPagesCount, totalValues}) {
  const { isLogged } = useSelector((store) => store.user);
  const { currentGroup, mode, vocabularyMode } = useSelector(
    (store) => store.book
  );

  return (
    <div className={classesCss.BookMenu}>

      <NavLink
        className={cx(classesCss.Home, classesCss.NavigationButton)}
        to={"/"}
      >
        <FontAwesomeIcon icon={faHome} />
      </NavLink>

      {isLogged && (
        <>
          <Button
            label={<FontAwesomeIcon icon={faCog} />}
            onClick={settingsOn}
            className={cx(classesCss.Settings, classesCss.NavigationButton)}
          />
          {mode === MODE_VOCABULARY ? (
            <NavLink
              className={classesCss.NavigationLink}
              to={`/${MODE_BOOK}/${currentGroup + 1}/1`}
            >
              Учебник
            </NavLink>
          ) : (
            <NavLink
              className={classesCss.NavigationLink}
              to={`/${MODE_VOCABULARY}/${VOCABULARY_MODE_NORMAL}/${currentGroup + 1}/1`}
            >
              Словарь
            </NavLink>
          )}
        </>
      )}
      {mode === MODE_BOOK
      || (mode === MODE_VOCABULARY && vocabularyMode === VOCABULARY_MODE_DIFFICULT)?
        <GameMenu /> : null
      }
      <Pagination
        totalPagesCount={totalPagesCount}
        setTotalPagesCount={setTotalPagesCount}
      />

      {isLogged &&
        !(mode === MODE_VOCABULARY && vocabularyMode !== VOCABULARY_MODE_NORMAL) && (
          <div>
            <div>Изучаемых слов: {totalValues.learned}</div>
            <div>
              Успешно: {totalValues.success}/{totalValues.success + totalValues.fail}
            </div>
          </div>
        )}

      <GroupMenu />
    </div>
  );
}
