import React from "react"
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import classesCss from "./Button.module.scss";


export default function SearchButton({className, active, ...props}){
  return (
    <Button
      label={<FontAwesomeIcon icon={faSearch}/>}
      className={cx(classesCss.SearchButton, className, {[classesCss.Active]: active})}
      {...props}
    />
  )
}