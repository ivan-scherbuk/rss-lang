import React from "react"
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import cx from "classnames";
import classesCss from "./Button.module.scss";

export default function GitHubButton({className, nickName, label, classes, ...props}){
  return (
    <a href={`https://github.com/${nickName}`}>
      <Button
        className={cx(className, classesCss.HardButton)}
        label={
          <>
            <FontAwesomeIcon className={classes?.icon} icon={faGithub}/>
            <span className={classes?.label}> {label}</span>
          </>}
        {...props}
      />
    </a>

  )
}