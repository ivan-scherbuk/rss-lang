import React from "react";
import { NavLink } from "react-router-dom";
import classesCss from "../BookPage.module.scss";
import GameMenu from "./GameMenu";
import cx from "classnames"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCog } from '@fortawesome/free-solid-svg-icons'
import Button from "../../../components/Buttons/Button";


export default function BookHeader({
  settingsOn,
  groupPath,
  gameState,
  isLogged,
}) {
  return (
    <>
      <NavLink className={cx(classesCss.Home, classesCss.NavigationButton)} to={"/"}>
        <FontAwesomeIcon icon={faHome} />
      </NavLink>
      {isLogged && (
        <>
          <Button
            label={<FontAwesomeIcon icon={faCog}/>}
            onClick={settingsOn}
            className={cx(classesCss.Settings, classesCss.NavigationButton)}
          />
          {groupPath === "" ? (
            <NavLink
              onClick={() => sessionStorage.setItem("currentPage", 0)}
              className={classesCss.NavigationLink}
              to={"/book/vocabulary/learn/group/1"}
            >
              Словарь
            </NavLink>
          ) : (
            <NavLink
              onClick={() => sessionStorage.setItem("currentPage", 0)}
              className={classesCss.NavigationLink}
              to={"/book/group/1"}
            >
              Учебник
            </NavLink>
          )}
          {(groupPath === "" || groupPath === "vocabulary/difficult/") && (
            <GameMenu
              gameCallValues = {gameState}
            />
          )}
        </>
      )}
    </>
  );
}
