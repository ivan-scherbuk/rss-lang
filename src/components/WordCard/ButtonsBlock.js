import React from "react";
import HardButton from "../Buttons/HardButton";
import classesCss from "./WordCard.module.scss";
import cx from "classnames";
import { useUserWordUpdate } from "../../hooks/hooks.user";
import { useSelector } from "react-redux";
import Button from "../Buttons/Button";

export default function ButtonsBlock(props){
  const {
    currentSectionVocabulary,
    notification,
    page,
    cardInfo,
  } = props;

  const {update} = useUserWordUpdate();
  const {isButtonsVisible} = useSelector(store => store.book)

  const {successCounter, failCounter} = cardInfo?.optional ? cardInfo.optional : {}

  //TODO: toggle if already hard or deleted
  return (
    <div className={classesCss.ButtonBlock}>
      {
        isButtonsVisible ?
          <>
            <HardButton
              className={cx(classesCss.Button, classesCss.HardButton)}
              onClick={() => {
                update(cardInfo, {difficulty: "hard"})
              }}
            />
            <Button
              className={cx(classesCss.Button, classesCss.Icon)}
              onClick={() => {
                update(cardInfo, {deleted: true})
              }}
              label={"delete_forever"}
            />
          </>
          : null
      }

      <div className={classesCss["Icon"]}>{notification}</div>
      {["difficult", "delete"].includes(currentSectionVocabulary) && (
        <div>Page: {page + 1}</div>
      )}

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
