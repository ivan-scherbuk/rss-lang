import React from "react";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import classesCss from "./BookPage.module.scss";
import levelStyles from "../styles/Styles.module.scss";

export default function BookNavbar({ groupPath }) {
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
      {groups.map((group, index) => {
        return (
          <NavLink
            key={group}
            to={"/book/" + groupPath + "group/" + group}
            onClick={onGroupChanged}
            className={cx(
              classesCss.BookLink,
              levelStyles[`Level${index + 1}`]
            )}
            activeClassName={classesCss.Active}
          >
            {group}
          </NavLink>
        );
      })}
    </div>
  );
}
