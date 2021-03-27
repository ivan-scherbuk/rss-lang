import React from "react";
import { NavLink } from "react-router-dom";
import classesCss from "./../styles/BookPage.module.scss";

export default function BookHeader() {
  return (
    <div className={classesCss.BookHeader}>
      <NavLink to={"/"}>Main</NavLink>
      <NavLink to={"/book/settings"}>Settings</NavLink>
      <NavLink to={"/book/vocabulary"}>Vocabulary</NavLink>
    </div>
  );
}
