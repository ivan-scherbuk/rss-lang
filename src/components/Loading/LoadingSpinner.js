import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import classesCss from "./Loading.module.scss"

export default function LoadingSpinner(){
  return(
    <FontAwesomeIcon
      className={classesCss.LoadingSpinner}
      icon={faSpinner}
    />
  )
}