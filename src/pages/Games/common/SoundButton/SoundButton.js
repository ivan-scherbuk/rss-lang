import React, { useMemo } from "react"
import Button from "../../../../components/Buttons/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeOff } from '@fortawesome/free-solid-svg-icons'



export default function SoundButton({file, className}){

  const pronounce = useMemo(() => {
    return new Audio(file)
  }, [file])

  return (
    <Button
      onClick={() => pronounce.play()}
      className={className}
      label={<FontAwesomeIcon icon={faVolumeOff} />}
    />
  )
};