import React from "react"
import cx from "classnames"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronCircleUp} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import classesCss from "./Button.module.scss"

export default function PopUpMenuButton({active, className, ...props}){
  return(
    <Button
      className={cx(classesCss.PopUpMenuButton, className, {[classesCss.Active]: active})}
      label={
        <FontAwesomeIcon icon={faChevronCircleUp} />
      }
      {...props}
    />
  )
}