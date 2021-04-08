import React from "react";
import HardButton from "../Buttons/HardButton";
import classesCss from "./WordCard.module.scss";
import cx from "classnames";
import { useUserWordUpdate } from "../../hooks/hooks.user";
import { useSelector } from "react-redux";
import Button from "../Buttons/Button";
import {
  MODE_VOCABULARY,
  VOCABULARY_MODE_DELETED,
  VOCABULARY_MODE_DIFFICULT,
  WORD_HARD,
  WORD_NORMAL,
} from "../../settings";

export default function ButtonsBlock({cardInfo}){

  const {update} = useUserWordUpdate();
  const {successCounter, failCounter} = cardInfo?.optional ? cardInfo.optional : {};
  const {isButtonsVisible, vocabularyMode, mode} = useSelector(store => store.book)

  const restoreWord = () => {
    if (vocabularyMode === VOCABULARY_MODE_DIFFICULT) {
      update(cardInfo, {difficulty: WORD_NORMAL});
    }
    if (vocabularyMode === VOCABULARY_MODE_DELETED) {
      update(cardInfo, {deleted: false});
    }
  };

  return (
    <div className={classesCss.ButtonBlock}>
      {
        (() => {
          const isHardOrDeletedMode = [VOCABULARY_MODE_DIFFICULT, VOCABULARY_MODE_DELETED].includes(vocabularyMode)
          if(mode === MODE_VOCABULARY && isHardOrDeletedMode){
            return(
              <div>
                <Button
                  className={cx(classesCss.Button, classesCss.Icon)}
                  onClick={restoreWord}
                  label={"восстановить"}
                />
                <div>Page: {cardInfo.page + 1}</div>
              </div>
            )
          } else if(isButtonsVisible){
            return(
              <>
                <HardButton
                  className={cx(classesCss.Button, classesCss.HardButton)}
                  onClick={() => {
                    update(cardInfo, {difficulty: WORD_HARD});
                  }}
                />
                <Button
                  className={cx(classesCss.Button, classesCss.Icon)}
                  onClick={() => {
                    update(cardInfo, {deleted: true});
                  }}
                  label={"delete_forever"}
                />
              </>
            )
          }
        })()
      }
      {successCounter + failCounter ? (
        <div className={classesCss.StatsCounters}>
          <span className={classesCss.SuccessCounter}>{successCounter}</span>/
          <span className={classesCss.TotalCounter}>
            {successCounter + failCounter}
          </span>
        </div>
      ) : null}
    </div>
  );
}
