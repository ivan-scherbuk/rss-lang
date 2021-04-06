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

export default function BookMenu({
  totalFailed,
  totalSuccess,
  totalLearned,
  settingsOn,
  gameState,
  groupPath,
  totalPagesCount,
  setTotalPagesCount,
}) {
  const { isLogged } = useSelector((store) => store.user);
  const { currentPageIndex, pagesList, currentGroup, mode } = useSelector(
    (store) => store.book
  );
  const currentPageList = pagesList[currentGroup];

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
          {mode === "vocabulary" ? (
            <NavLink
              className={classesCss.NavigationLink}
              to={`/book/${currentGroup + 1}/1`}
            >
              Учебник
            </NavLink>
          ) : (
            <NavLink
              className={classesCss.NavigationLink}
              to={`/vocabulary/learn/${currentGroup + 1}/1`}
            >
              Словарь
            </NavLink>
          )}
          <GameMenu gameCallValues={gameState} groupPath={groupPath} />
        </>
      )}

      <Pagination
        groupPath={groupPath}
        totalPagesCount={totalPagesCount}
        setTotalPagesCount={setTotalPagesCount}
      />

      {isLogged &&
        !(groupPath.includes("difficult") || groupPath.includes("delete")) && (
          <div>
            <div>Изучаемых слов: {totalSuccess}</div>
            <div>
              Успешно: {totalSuccess}/{totalSuccess + totalFailed}
            </div>
          </div>
        )}

      <GroupMenu groupPath={groupPath} />
    </div>
  );
}
