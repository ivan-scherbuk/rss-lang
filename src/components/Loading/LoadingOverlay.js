import React from "react"
import cx from "classnames"
import LoadingSpinner from "./LoadingSpinner";
import classesCss from "./Loading.module.scss"

export default function LoadingOverlay({className}){
  return(
    <div className={cx(className, classesCss.LoadingOverlay)}>
      <LoadingSpinner />
    </div>
  )
}