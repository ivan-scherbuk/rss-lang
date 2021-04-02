import React from "react"
import cx from "classnames"
import {SETTINGS} from "../../../../settings";
import {firstLetterToCapital} from "../../../../helpers/gameUtils";
import classesCss from "./StatisticModal.module.scss"
import SoundButton from "../SoundButton/SoundButton";


export default function StatisticModal({words, className}){
  return (
    <div className={cx(className, classesCss.StatisticModal)}>
      <h3>Результаты</h3>
      <table className={classesCss.StatisticTable}>
        <tbody className={classesCss.Body}>
        {
          words.map((word, index) => {
            console.log(word)
            return (
              <tr key={word.id}
                  className={classesCss.Word}>
                <td>
                  <SoundButton
                    file={`${SETTINGS.SERVER}/${word.audio}`}
                    className={classesCss.AudioButton}
                  />
                </td>
                <td>{word.word}</td>
                <td>{word.transcription}</td>
                <td>{word.wordTranslate}</td>
                <td>{!word.result.failed? "✔" : "❌"}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
}


