import React from "react"
import cx from "classnames"
import classesCss from "../../pages/BookPage/BookPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";


export default function HomeLink({className}){
  return(
    <NavLink
      className={cx(classesCss.NavigationButton, className)}
      to={"/"}
    >
      <FontAwesomeIcon icon={faHome}/>
    </NavLink>
  )
}