import React, { useEffect, useMemo, useState } from "react"
import {firstLetterToCapital} from "../../../helpers/gameUtils";
import PuzzleField from "./PuzzleField"
import Timer from "../common/Timer";
import Lives from "./components/Lives";
import WordList from "./components/WordsList";
import classesCss from "./PuzzleGame.module.scss"

const TOTAL_LIVES = 3
const SECONDS_FOR_COMPLETE = 30

export default function PuzzleGame({words, onLoading, onWordSelect, onGameEnd}){

  const [currentWord, setCurrentWord] = useState(0)
  const [lives, setLives] = useState(TOTAL_LIVES)
  const [timerState, setTimerState] = useState({
    shouldReset : false,
    shouldPause: false,
  })
  const [autoComplete, setAutoComplete] = useState(false)

  const currentChunk = useMemo(() => {
    if (words?.length > 0) {
      return [...words]
    }
    return null
  }, [words])

  function resetTimer(){
    setTimerState(state => ({...state, shouldReset: false}))
  }

  function completeAssemblyHandler(){
    if(currentWord + 1 < currentChunk.length){
      setTimerState(state => ({...state, shouldReset: true, shouldPause: false}))
      if(autoComplete) {
        setAutoComplete(false)
        currentChunk[currentWord] = {...currentChunk[currentWord], status:"failed"}
        onWordSelect(currentChunk[currentWord], {failed: true})
      } else {
        currentChunk[currentWord] = {...currentChunk[currentWord], status:"succeed"}
        onWordSelect(currentChunk[currentWord], {succeed: true})
      }
      setCurrentWord(current => {
        return current + 1
      })
      if(lives < TOTAL_LIVES) setLives(TOTAL_LIVES)
    } else {
      onGameEnd()
    }
  }

  function wrongSelectHandler(){
    if(lives > 0)setLives(state => state - 1)
  }

  useEffect(() => {
    if(lives <= 0) {
      setAutoComplete(true)
      setTimerState(state => ({...state, shouldPause: true}))
    }
  }, [lives])


  return (
    <div className={classesCss.PuzzleGame}>
      {
        (() => {
          if(onLoading){
            return (<div>ЗАГРУЗКА</div>)
          } else if(currentChunk && currentWord + 1 <= currentChunk.length){
            return(
              <div
                className={classesCss.GameLayout}
                key={currentChunk[currentWord].word}
              >
                <div className={classesCss.WordBlock}>
                  <div className={classesCss.CurrentWord}>{firstLetterToCapital(currentChunk[currentWord].word)}</div>
                  <div className={classesCss.Translation}>
                    <span>{currentChunk[currentWord].textExampleTranslate}</span>
                  </div>
                  <PuzzleField
                    text={currentChunk[currentWord].textExample}
                    onSuccess={completeAssemblyHandler}
                    onWrongSelect={wrongSelectHandler}
                    autoComplete={autoComplete}
                  />
                </div>
                <div className={classesCss.HelperBlock}>
                  <Timer
                    className={classesCss.Countdown}
                    softReset={timerState.shouldReset? resetTimer : null}
                    pause={timerState.shouldPause}
                    onWillGenerate={() => {
                      setAutoComplete(true)
                      //return false prevent further timer process, and we save 0 on timer, if we will use
                      //onGenerate instead, timer will reset and show counter of next card
                      return false
                    }}
                    cycle={SECONDS_FOR_COMPLETE * 1000}
                    tic={1000}
                  />
                  <WordList
                    words={currentChunk}
                    currentWordIndex={currentWord}
                  />
                  <Lives
                    livesCount={lives}
                    totalLives={TOTAL_LIVES}
                  />
                </div>
              </div>
            )
          }
          return null
        })()
      }
    </div>
  )
}