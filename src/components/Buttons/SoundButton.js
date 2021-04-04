import React, { useMemo } from "react"
import Button from "./Button";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faVolumeOff } from '@fortawesome/free-solid-svg-icons'
import classesCss from "./Button.module.scss"
import cx from "classnames"



export default function SoundButton({file, className, ...props}){

  const pronounce = useMemo(() => {
    return new Audio(file)
  }, [file])

  return (
    <Button
      onClick={() => pronounce.play()}
      className={cx(className, classesCss.SoundButton)}
      label={"volume_up"}
      {...props}
    />
  )
};