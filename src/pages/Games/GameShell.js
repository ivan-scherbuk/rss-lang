import React, { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import LevelButtons from "./common/Levels/LevelButtons";
import levelClasses from "../styles/Styles.module.scss"
import { useWords, useWordsGroup } from "../../hooks/hooks.words";
import { createRandomChunkFromGroup } from "../../helpers/utils.words";
import {SETTINGS} from "../../settings";
import GameModal from "./common/GameModal/GameModal";
import classesCss from "./Games.module.scss"
import { useUserWordUpdate } from "../../hooks/hooks.user";
import { useSelector } from "react-redux";
import StatisticModal from "./common/StatisticModal/StatisticModal";

export default function GameShell(props){
  const {
    children,
    gameData,
    className,
    style,
    //randomLengthStack = SETTINGS.DEFAULT_WORD_CHUNK_LENGTH,
    randomLengthStack = 3,
  } = props

  const [currentChunk, setCurrentChunk] = useState(null)
  const [isGameEnd, setGameEnd] = useState(false)

  const {currentWordsGroup, getWordsGroup, onGroupLoading} = useWordsGroup()
  const {currentWords, getWordsChunk, onLoading} = useWords()
  const {update: userWordUpdate} = useUserWordUpdate()

  const {isLogged} = useSelector(state => state.user)
  const {state: {group: urlGroup, page: urlPage}} = useLocation()

  const chunkCopyForStatistic = useMemo(() => {
    if (currentChunk) {
      return [...currentChunk]
    }
    return null
  }, [currentChunk])


  function levelSelectHandler(index){
    getWordsGroup(index)
  }

  function checkGroup(group){
    if (group < SETTINGS.GROUPS_COUNT) return group
    return 0
  }

  function checkPage(page){
    if (page < SETTINGS.PAGES_COUNT) return page
    return 0
  }

  function addWordToUserHandler(word, params){
    if (isLogged) {
      userWordUpdate(word, params).then(res => {
        const statisticWord = chunkCopyForStatistic.findIndex(statWord => statWord.id === word.id)
        if (statisticWord + 1) {
          chunkCopyForStatistic[statisticWord].userNewResults = res
        }
      })
    }
    const statisticWord = chunkCopyForStatistic.findIndex(statWord => statWord.id === word.id)
    if (statisticWord + 1) {
      chunkCopyForStatistic[statisticWord].result = params
    }
  }

  function gameEndHandler(){
    setGameEnd(true)
  }

  useEffect(() => {
    if (urlGroup >= 0 && urlPage >= 0) {
      getWordsChunk(checkGroup(urlGroup), checkPage(urlPage))
    } else if (urlGroup >= 0) {
      getWordsGroup(checkGroup(urlGroup))
    }
  }, [urlGroup, urlPage, getWordsGroup, getWordsChunk])

  useEffect(() => {
    if (currentWordsGroup) {
      setCurrentChunk(createRandomChunkFromGroup(currentWordsGroup, randomLengthStack))
    }
  }, [currentWordsGroup, randomLengthStack])

  useEffect(() => {
    if (currentWords) {
      setCurrentChunk(currentWords)
    }
  }, [currentWords])


  const gameContent = useMemo(() => {
    function getChild(props){
      return React.Children.map(children,
        child => {
          return (
            <child.type
              {...child.props}
              {...props}
            >
              {children}
            </child.type>)
        })
    }

    if ((children && (onGroupLoading || onLoading))
      || (children && !(onGroupLoading || onLoading) && currentChunk?.length)) {
      const wordsProps = {
        words: currentChunk,
        onLoading: onGroupLoading || onLoading,
        onWordSelect: addWordToUserHandler,
        onGameEnd: gameEndHandler,
      }
      return getChild(wordsProps)
    }
    return null
  }, [children, onGroupLoading, onLoading, currentChunk])


  console.log(chunkCopyForStatistic)
  return (
    <div className={[className, classesCss.GameShell].join(" ")} style={style}>
      {
        (() => {
          if (!isGameEnd) {
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
            <StatisticModal
              className={classesCss.StatisticModal}
              words={chunkCopyForStatistic}
            />
          )
        })()
      }
    </div>
  )
};