import React from 'react'
import Button from "./Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import cx from "classnames"
import classesCss from "./Button.module.scss"


export default function ResetButton({className, ...props}){
  return(
    <Button
      className={cx(classesCss.ResetButton, className)}
      label = {<FontAwesomeIcon icon={faUndo}/>}
      {...props}
    />
  )
}