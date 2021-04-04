import React from "react";
import { Link, NavLink } from "react-router-dom";
import classesCss from "./BookPage.module.scss";

export default function BookHeader({
  settingsOn,
  groupPath,
  gameState,
  isLogged,
}) {
  return (
    <div className={classesCss.BookHeader}>
      <NavLink className={classesCss.headerLink} to={"/"}>
        Главная
      </NavLink>
      {isLogged && (
        <div className={classesCss.userHeader}>
          <div onClick={settingsOn}>Настройки</div>
          {groupPath === "" ? (
            <NavLink
              onClick={() => sessionStorage.setItem("currentPage", 0)}
              className={classesCss.headerLink}
              to={"/book/vocabulary/learn/group/1"}
            >
              Словарь
            </NavLink>
          ) : (
            <NavLink
              onClick={() => sessionStorage.setItem("currentPage", 0)}
              className={classesCss.headerLink}
              to={"/book/group/1"}
            >
              Учебник
            </NavLink>
          )}
          {(groupPath === "" || groupPath === "vocabulary/difficult/") && (
            <div>
              <Link
                className={classesCss.headerLink}
                to={{ pathname: "/games/savannah", state: gameState }}
              >
                Саванна
              </Link>
              <Link
                className={classesCss.headerLink}
                to={{ pathname: "/games/audiocall", state: gameState }}
              >
                Аудио-вызов
              </Link>
              <Link
                className={classesCss.headerLink}
                to={{ pathname: "/games/sprint", state: gameState }}
              >
                Спринт
              </Link>
              <Link
                className={classesCss.headerLink}
                to={{ pathname: "/games/puzzle", state: gameState }}
              >
                Пазл
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
