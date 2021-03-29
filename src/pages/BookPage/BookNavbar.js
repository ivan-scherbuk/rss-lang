import React from "react";
import { NavLink } from "react-router-dom";
import classesCss from "./BookPage.module.scss";

export default function BookNavbar({ classes }) {
  let groups = [];
  const totalGroupsCount = 6;
  for (let i = 1; i <= totalGroupsCount; i++) {
    groups.push(i);
  }
  const onGroupChanged = () => {
    sessionStorage.removeItem("currentPage");
  };
  return (
    <div className={classesCss.BookNavbar}>
      {groups.map((group) => {
        return (
          <div
            key={group}
            onClick={onGroupChanged}
            className={classes && classes.active}
          >
            <NavLink to={"/book/group/" + group}>Group {group}</NavLink>
          </div>
        );
      })}
    </div>
  );
}