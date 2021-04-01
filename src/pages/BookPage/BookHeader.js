import React from "react";
import { NavLink } from "react-router-dom";
import classesCss from "../styles/BookPage.module.scss";

export default function BookHeader({ settingsOn, groupPath }) {
  return (
    <div className={classesCss.BookHeader}>
      <NavLink className={classesCss.headerLink} to={"/"}>
        Главная
      </NavLink>
      <div onClick={settingsOn}>Настройки</div>
      {groupPath === "" ? (
        <NavLink
          className={classesCss.headerLink}
          to={"/book/vocabulary/learn/group/1"}
        >
          Словарь
        </NavLink>
      ) : (
        <NavLink className={classesCss.headerLink} to={"/book/group/1"}>
          Учебник
        </NavLink>
      )}
    </div>
  );
}
