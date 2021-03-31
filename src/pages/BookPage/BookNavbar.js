import React from "react";
import { NavLink } from "react-router-dom";
import classesCss from "../styles/BookPage.module.scss";

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
          <div key={group} onClick={onGroupChanged}>
            <NavLink
              to={"/book/group/" + group}
              className={
                classes
                  ? [
                      classes.group,
                      classesCss.group,
                      classesCss["group" + group],
                    ].join(" ")
                  : [classesCss.group, classesCss["group" + group]].join(" ")
              }
              activeClassName={classes && classes.activeGroup}
            >
              {group}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}