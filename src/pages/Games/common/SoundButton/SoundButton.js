import React, { useMemo } from "react"
import Button from "../../../../components/Buttons/Button";


export default function SoundButton({file, className}){

  const pronounce = useMemo(() => {
    return new Audio(file)
  }, [file])

  return (
    <Button
      onClick={() => pronounce.play()}
      className={className}
      label={"Звук"}
    />
  )
};