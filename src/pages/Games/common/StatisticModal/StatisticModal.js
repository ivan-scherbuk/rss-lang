import React from "react"
import cx from "classnames"
import { SETTINGS } from "../../../../settings";
import classesCss from "./StatisticModal.module.scss"
import SoundButton from "../SoundButton/SoundButton";


//Сделать failied/succeed
//Сделать статистику пользователя за все время по этому слову
//Сделать повторение игры на этом же наборе слова
//Повторение игры с новым разделом
//Возврат ко всем играм
//Возврат в учебник
//Выключение звука
//Раскрытие на всю страницу
//Сделать прокрутку на всю страницу

export default function StatisticModal({words, className}){
  return (
    <div className={cx(className, classesCss.StatisticModal)}>
      <h3>Результаты</h3>
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
                <td>{word?.result?.failed ? "❌" : "✔️"}</td>
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
  )
}


