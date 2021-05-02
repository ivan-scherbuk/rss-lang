import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from "@fortawesome/free-solid-svg-icons"
import classesCss from "./Button.module.scss"
import Button from "./Button";
import cx from "classnames"

export default function HardButton({label, className, ...props}){
  return(
    <Button
      className={cx(className, classesCss.HardButton)}
      label={<FontAwesomeIcon icon={faBolt}/>}
      {...props}
    />
  )
}