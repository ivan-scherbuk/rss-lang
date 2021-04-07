import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useUserWordUpdate } from "../../hooks/hooks.user";
import { useWords, useWordsGroup } from "../../hooks/hooks.words";
import { createRandomChunkFromGroup } from "../../helpers/utils.words";
import LevelButtons from "./common/Levels/LevelButtons";
import GameModal from "./common/GameModal/GameModal";
import StatisticModal from "./common/StatisticModal/StatisticModal";
import classesCss from "./Games.module.scss"
import levelClasses from "../LevelStyles.module.scss"
import { SETTINGS } from "../../settings";
import BookButton from "../../components/Buttons/BookButton";
import ResetButton from "../../components/Buttons/ResetButton";
import cx from "classnames"
import BackToGameLink from "./common/BackToGameLink";
import CloseLink from "../../components/Buttons/CloseLink";
import { useStatistic } from "../../hooks/hooks.statistic";
import {resetGameStatistics} from "../../redux/games/actions";
import {getStatisticsThunk} from "../../redux/games/thunk.statistics";
import {checkGroup, checkPage} from "../../helpers/utils.checkers";


const initialStatistic = {
  rightAnswers: 0,
  wrongAnswers: 0,
  wordCounter: 0,
  bestSeries: 0
}

export default function GameShell(props){
  const {
    children,
    gameData,
    className,
    style,
    randomLengthStack = SETTINGS.DEFAULT_WORD_CHUNK_LENGTH,
  } = props

  const dispatch = useDispatch();
  const {currentWordsGroup, getWordsGroup, onGroupLoading} = useWordsGroup()
  const {onLoading} = useWords()
  const {update: updateUserWord} = useUserWordUpdate()
  const {update: updateStatistic} = useStatistic()

  const {isLogged, id: userId} = useSelector(state => state.user)

  const [currentChunk, setCurrentChunk] = useState(null)
  const [gameEndLastWord, setGameEndLastWord] = useState(-1)
  const [gameResetKey, setGameResetKey] = useState(Math.random())
  const [statisticChunk, setStatisticChunk] = useState(null)
  const [statistic, setStatistic] = useState(initialStatistic)
  const [statisticWasUpdate, setStatisticWasUpdate] = useState(false)
  const [currentSeries, setCurrentSeries] = useState(0)

  const {state} = useLocation()
  const {words: urlWords} = state ? state : {}

  function levelSelectHandler(index){
    getWordsGroup(index)
  }

  function gameEndHandler(index){
    setGameEndLastWord(Number.isInteger(index)? index + 1 : currentChunk.length)
  }

  function setGameStartAgain(){
    setGameResetKey(state => state + 1)
    setCurrentSeries(0)
    setStatisticChunk([...currentChunk])
    setStatistic(initialStatistic)
    setStatisticWasUpdate(false)
    setGameEndLastWord(-1)
  }

  function updateStatisticChunk(wordForUpdate, dataForUpdate){
    const statisticWordIndex = statisticChunk.findIndex(statWord => statWord.id === wordForUpdate.id)
    if (statisticWordIndex + 1) {
      setStatisticChunk(currentStatistic => {
        const newStatisticChunk = [...currentStatistic]
        newStatisticChunk[statisticWordIndex] = {...newStatisticChunk[statisticWordIndex], ...dataForUpdate}
        return newStatisticChunk
      })
      return true
    }
    return false
  }

  function wordSelectHandler(word, params){
    const paramsForUpdate = {succeed: !!params.succeed}

    if (isLogged) {
      updateUserWord(word, paramsForUpdate).then(updatedWord => {
        if (updatedWord.optional.failCounter + updatedWord.optional.successCounter === 1) {
          setStatistic(state => ({...state, wordCounter: state.wordCounter + 1}))
        }
        updateStatisticChunk(word, {userNewResults: updatedWord})
      }).catch(() => {
        updateStatisticChunk(word, {userNewResults: {}})
      })
      const statisticForUpdate = {}
      if (paramsForUpdate.succeed) {
        statisticForUpdate.rightAnswers = statistic.rightAnswers + 1
        if (currentSeries + 1 > statistic.bestSeries) {
          statisticForUpdate.bestSeries = currentSeries + 1
        }
        setCurrentSeries(currentSeries + 1)
      } else {
        if (currentSeries) {
          setCurrentSeries(0)
        }
        statisticForUpdate.wrongAnswers = statistic.wrongAnswers + 1
      }
      setStatistic({...statistic, ...statisticForUpdate})
    }
    updateStatisticChunk(word, {result: paramsForUpdate})

  }

  useEffect(() => {
    if(urlWords?.length) setCurrentChunk([...urlWords])
  }, [urlWords])

  useEffect(() => {
    if (currentWordsGroup) {
      setCurrentChunk(createRandomChunkFromGroup(currentWordsGroup, randomLengthStack))
    }
  }, [currentWordsGroup, randomLengthStack])

  useEffect(() => {
    if (currentChunk?.length) {
      setStatisticChunk([...currentChunk])
    }
  }, [currentChunk])

  useEffect(() => {

    if(isLogged && gameEndLastWord > 0 && !statisticWasUpdate && statisticChunk?.length){
      if(statisticChunk[gameEndLastWord - 1].userNewResults){
        updateStatistic(gameData.key, statistic)
        setStatisticWasUpdate(true)
      }
    }
  }, [gameEndLastWord, statisticChunk, isLogged, statisticWasUpdate, updateStatistic, gameData?.key, statistic])

  useEffect(() => {
    if(userId){
      dispatch(getStatisticsThunk(userId));
      return () => {
        dispatch(resetGameStatistics());
      }
    }
  }, [dispatch, userId]);

  function getGameWithData(){
    const onAnyLoading = onGroupLoading || onLoading
    if (gameEndLastWord === -1 && ((children && onAnyLoading)
      || (children && !onAnyLoading && currentChunk?.length))) {
      const gameProps = {
        key: gameResetKey,
        words: currentChunk,
        onLoading: onAnyLoading,
        onWordSelect: wordSelectHandler,
        onGameEnd: gameEndHandler,
      }
      return React.Children.map(children,
        child => {
          return (
            <child.type
              {...child.props}
              {...gameProps}
            >
              {children}
            </child.type>)
        })
    }
    return null
  }

  const gameContent = getGameWithData()

  return (
    <div className={[className, classesCss.GameShell].join(" ")} style={style}>
      {
        (() => {
          if (gameEndLastWord === -1) {
            if (gameContent) return gameContent
            return (
              <GameModal
                gameData={gameData}
              >
                <LevelButtons
                  levelNumbers={6}
                  levelStyles={levelClasses}
                  onSelect={levelSelectHandler}
                />
              </GameModal>)
          }
          return (
            <>
              <StatisticModal
                className={classesCss.StatisticModal}
                words={statisticChunk.filter((word, index) => index < gameEndLastWord)}
              />
              <div className={classesCss.GameEndHelper}>
                <ResetButton
                  className={cx(classesCss.ResetButton, classesCss.Button)}
                  onClick={setGameStartAgain}/>
                <BookButton
                  className={cx(classesCss.BookLink, classesCss.Button)}
                />
                <BackToGameLink
                  className={cx(classesCss.BackLink, classesCss.Button)}
                  classes={{icon: classesCss.Icon}}
                  words={urlWords}/>
              </div>
            </>
          )
        })()
      }
      <CloseLink/>
    </div>
  )
};