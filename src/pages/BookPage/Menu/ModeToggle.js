import React from "react"
import cx from "classnames"
import { MODE_BOOK, MODE_VOCABULARY } from "../../../settings";
import { NavLink } from "react-router-dom";
import classesCss from "../BookPage.module.scss";

export default function ModeToggle({mode, currentGroup, className}){

  return (
    <>
      {
        mode === MODE_VOCABULARY ? (
          <NavLink
            className={cx(classesCss.NavigationLink, className)}
            to={`/${MODE_BOOK}/${currentGroup + 1}/1`}
          >
            Учебник
          </NavLink>
        ) : (
          <NavLink
            className={cx(classesCss.NavigationLink, className)}
            to={{pathname: `/${MODE_VOCABULARY}/${currentGroup + 1}/1`}}
          >
            Словарь
          </NavLink>
        )}
    </>
  )
}