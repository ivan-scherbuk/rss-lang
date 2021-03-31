import React from 'react'
import cx from "classnames"
import classesCss from '../PuzzleGame.module.scss'

export default function WordList({words = [], currentWordIndex}){
  return(
    <ul className={classesCss.WordList}>
      {
        words.map((word,index) => {
          const classes = cx({
            [classesCss.Succeed]: word.status === "succeed",
            [classesCss.Failed]: word.status === "failed",
            [classesCss.Current]: index === currentWordIndex
          })
          return(
            <li
              className={classes}
              key={`word-list-word${index}`}
            >
              {word.word}
            </li>
          )
        })
      }
    </ul>
  )
}