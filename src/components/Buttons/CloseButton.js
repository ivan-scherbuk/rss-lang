import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import classesCss from "./Button.module.scss"
import Button from "./Button";
import cx from "classnames"

export default function CloseButton({label, className, ...props}){
  return(
    <Button
      className={cx(className, classesCss.CloseButton)}
      label={<FontAwesomeIcon icon={faTimes}/>}
      {...props}
    />
  )
}