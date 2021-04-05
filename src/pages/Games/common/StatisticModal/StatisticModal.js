import React from "react"
import cx from "classnames"
import { SETTINGS } from "../../../../settings";
import classesCss from "./StatisticModal.module.scss"
import SoundButton from "../../../../components/Buttons/SoundButton";


//TODO: Выключение звука
//TODO: Раскрытие на всю страницу
//TODO: fix statistic record

export default function StatisticModal({words, className}){
  return (
    <div className={cx(className, classesCss.StatisticModal)}>
      <h3>Результаты</h3>
      <div className={classesCss.TableWrap}>
      <table className={classesCss.StatisticTable}>
        <thead>
        <tr>
          <th/>
          <th/>
          <th/>
          <th/>
          <th/>
          {words[0].userNewResults ?
            <>
            <th>✔️</th>
            <th>Всего</th>
            </> : null
          }
        </tr>
        </thead>

        <tbody className={classesCss.Body}>
        {
          words.map(word => {
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
                <td>{word?.result?.succeed ? "✔️" : "❌"}</td>
                {word.userNewResults ?
                  <>
                    <td>{word.userNewResults.optional?.successCounter}</td>
                    <td>{word.userNewResults.optional?.failCounter + word.userNewResults.optional?.successCounter}</td>
                  </>
                  : null
                }
              </tr>
            )
          })
        }
        </tbody>

      </table>
    </div>
    </div>
  )
}


