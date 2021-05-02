import React from "react"
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

export default function BackToGameLink({state, classes, ...props}){
  return(
    <NavLink

      to={{pathname:"/games", state}}
      {...props}
    >
      <FontAwesomeIcon
        className={classes.icon}
        icon={faArrowAltCircleLeft} />
      <span>Ко всем играм</span>
    </NavLink>
  )
}