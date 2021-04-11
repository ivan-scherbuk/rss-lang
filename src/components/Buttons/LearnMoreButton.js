import React from "react"
import Button from "./Button";
import cx from "classnames"
import classesCss from "./Button.module.scss"

export default function LearnMoreButton({className}){

  return(
    <Button
      label={"Узнать больше"}
      className={cx(classesCss.TransparentButton, className)}
    />
  )
}