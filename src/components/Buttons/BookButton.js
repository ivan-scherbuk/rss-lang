import React from "react";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import classesCss from "../../pages/MainPage/Navigation/Navigation.module.scss";
import cx from "classnames";
import { MODE_BOOK } from "../../settings/settings";

export default function BookButton({ className, label }) {
  return (
    <NavLink to={`/${MODE_BOOK}/1/1`}>
      <Button
        label={
          <div style={{backgroundImage: `url(${process.env.PUBLIC_URL}/static/books.png)`}}>
            <span>{label || "Учебник"}</span>
          </div>
          }

        className={cx(classesCss.BubbleButton, className)}
      />
    </NavLink>
  );
}
