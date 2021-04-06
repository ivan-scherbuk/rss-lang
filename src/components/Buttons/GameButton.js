import React from "react"
import Button from "./Button";
import { Link } from "react-router-dom";

export default function GameButton({gameCallValues, game, className, classes = {}}){


  return(
    <Link
      className={classes?.link}
      to={{pathname:`/games/${game.key}`, state:gameCallValues}}>
      <Button
        label={<span className={classes?.label}>{game.name}</span>}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/static/${game.navigationImage})`,
        }}
        className={className}
      />
    </Link>
  )
}
