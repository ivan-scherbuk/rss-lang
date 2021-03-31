import React, { useEffect } from "react"
import { useTimerGenerator } from "../../../hooks/hooks.game";

export default function Timer(props){
  const {
    onGenerate,
    onWillGenerate,
    onTic,
    cycle,
    tic,
    reset,
    pause,
    softReset,
    className} = props
  const timer = useTimerGenerator(
    {
      onGenerate,
      onTic,
      onWillGenerate,
      onReset: reset,
      onPause: pause,
      onSoftReset: softReset
    }, cycle, tic)

  useEffect(() => {
    if(reset) timer.reset()
    if(pause) timer.pause()
    if(softReset) timer.softReset()
  }, [timer, reset, pause, softReset])

  return (
    <div className={className}>
      {timer.getTimeToNextGen() >= 0 ? timer.getTimeToNextGen() / 1000 : 0}
    </div>
  )
}