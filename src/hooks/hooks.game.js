import { useEffect, useState } from "react"


export function useTimer(generateFn, checkInterval = 50, condition = true, dependencies = []){
  useEffect(() => {
    if (condition) {
      const generatorTimer = setInterval(() => {
        generateFn()
      }, checkInterval)
      return (() => clearInterval(generatorTimer))
    }
  }, [...dependencies, generateFn])
}


const defaultFnList = {
  onGenerate(){
  },
  onWillGenerate(){
  },
  onTic(){
  },
  onPause(){
  },
  onPlay(){
  },
  onReset(){
  },
  onToggle(){
  },
  onSoftReset(){
  }
}

export const useTimerGenerator = (fnList, generationTime, ticTime, condition = true) => {
  const fnListCopy = {...fnList}
  for(let fn in fnListCopy)
    if(fnListCopy.hasOwnProperty(fn) && typeof fnListCopy[fn] !== "function") delete fnListCopy[fn]
  fnList = {...defaultFnList, ...fnListCopy}

  const [timeToNextGen, setTimeToNextGen] = useState(generationTime)
  const [walkCondition, setWalkCondition] = useState(true)

  useTimer(() => {
    let willFurtherGenerate = true
    if(timeToNextGen <= 0 && condition){
      willFurtherGenerate = fnList.onWillGenerate()
    }
    if (timeToNextGen <= 0 && condition && (willFurtherGenerate ?? true)) {
      setTimeToNextGen(generationTime)
      fnList.onGenerate()
    } else {
      setTimeToNextGen(timeToNextGen - ticTime)
      fnList.onTic()
    }
  }, ticTime, condition && walkCondition, [timeToNextGen, condition, fnList])

  return {
    reset: () => {
      if(timeToNextGen > 0){
        setTimeToNextGen(0)
        if(!walkCondition) setWalkCondition(true)
        fnList.onReset()
      }
    },
    softReset:()=>{
      setTimeToNextGen(generationTime)
      if(!walkCondition) setWalkCondition(true)
      fnList.onSoftReset()
    },
    pause: () => {
      if (walkCondition) {
        setWalkCondition(false)
        fnList.onPause()
      }
    },
    play: () => {
      if (!walkCondition) {
        setWalkCondition(true)
        fnList.onPlay()
      }
    },
    toggle: () => {
      setWalkCondition(!walkCondition)
      fnList.onToggle()
    },
    getTimeToNextGen: () => {
      return timeToNextGen
    },
  }
}

