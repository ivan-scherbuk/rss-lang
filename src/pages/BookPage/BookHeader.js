import React from "react";
import { NavLink } from "react-router-dom";
import classesCss from "../styles/BookPage.module.scss";

export default function BookHeader({ settingsOn }) {
  return (
    <div className={classesCss.BookHeader}>
      <NavLink to={"/"}>Main</NavLink>
      <div onClick={settingsOn}>Settings</div>
      <NavLink to={"/book/vocabulary"}>Vocabulary</NavLink>
    </div>
  );
}
