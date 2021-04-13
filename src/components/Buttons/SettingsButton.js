import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import classesCss from "../../pages/BookPage/BookPage.module.scss";
import Button from "./Button";

export default function SettingsButton({className, ...props}){
  return (
    <Button
      label={<FontAwesomeIcon icon={faCog}/>}
      className={cx(classesCss.NavigationButton, className)}
      {...props}
    />
  )
}