import React from "react";
import cx from "classnames"
import classesCss from './LevelButtons.module.scss'

export default function LevelButtons({levelNumbers, levelStyles, onSelect, className}){


  return (
    <div className={cx(className, classesCss.LevelButtonsWrap)}>
      {
        new Array(6).fill(null).map((el, index) => {
          return (
            <div
              key = {`lb${index}`}
              className={cx(levelStyles[`Level${index+1}`], classesCss.Button)}
              onClick={() => onSelect(index)}
            >
              {index + 1}
            </div>
          )
        })
      }
    </div>
  )
}
