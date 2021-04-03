import React from "react"
import Button from "../Buttons/Button";
import { NavLink } from "react-router-dom";
import classesCss from "./Navigation.module.scss";
import cx from "classnames"

export default function BookLink({className, label}){
  return (
    <NavLink
      onClick={() => sessionStorage.setItem("currentPage", 0)}
      to="/book/group/1"
    >
      <Button
        label={label || "Учебник"}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/static/book.webp)`,
        }}
        className={cx(classesCss.BubbleButton, className)}
      />
    </NavLink>
  )

}