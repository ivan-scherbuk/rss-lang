import React from "react";
import { NavLink } from "react-router-dom";
import classesCss from "./../styles/BookPage.module.scss";

export default function BookNavbar() {
  let groups = [];
  const totalGroupsCount = 6;
  for (let i = 1; i <= totalGroupsCount; i++) {
    groups.push(i);
  }
  return (
    <div className={classesCss.BookNavbar}>
      {groups.map((group) => {
        return (
          <div>
            <NavLink to={"/book/group/" + group}>Group {group}</NavLink>
          </div>
        );
      })}
    </div>
  );
}
