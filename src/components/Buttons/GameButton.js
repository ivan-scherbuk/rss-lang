import React from "react"
import Button from "./Button";
import { Link } from "react-router-dom";
import classesCss from "./Button.module.scss"
import cx from "classnames"

export default function GameButton({gameCallValues, game, className, classes = {}}){

  return (
    <Link
      className={classes?.link}
      to={{pathname: `/games/${game.key}`, state: gameCallValues}}>
      <Button
        className={cx(classesCss.GameButton, className)}
        label={
          <div
            style={{backgroundImage: `url(${process.env.PUBLIC_URL}/static/${game.navigationImage})`}}>
          <span className={classes?.label}>
            {game.name}
          </span>
          </div>
        }
      />
    </Link>
  )
}
