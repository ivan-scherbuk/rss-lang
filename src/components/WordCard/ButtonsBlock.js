import React from "react";
import HardButton from "../Buttons/HardButton";
import classesCss from "./WordCard.module.scss";
import cx from "classnames";
import { useUserWordUpdate } from "../../hooks/hooks.user";
import { useSelector } from "react-redux";
import Button from "../Buttons/Button";

export default function ButtonsBlock(props) {
  const { notification, cardInfo, sectionVocabulary } = props;

  const { update } = useUserWordUpdate();
  const { isButtonsVisible } = useSelector((store) => store.book);

  const { successCounter, failCounter } = cardInfo?.optional
    ? cardInfo.optional
    : {};

  const restoreWord = () => {
    if (sectionVocabulary === "difficult") {
      update(cardInfo, { difficulty: "normal" });
    }
    if (sectionVocabulary === "delete") {
      update(cardInfo, { deleted: false });
    }
  };

  //TODO: toggle if already hard or deleted
  return (
    <div className={classesCss.ButtonBlock}>
      {!["difficult", "delete"].includes(sectionVocabulary) &&
      isButtonsVisible ? (
        <>
          <HardButton
            className={cx(classesCss.Button, classesCss.HardButton)}
            onClick={() => {
              update(cardInfo, { difficulty: "hard" });
            }}
          />
          <Button
            className={cx(classesCss.Button, classesCss.Icon)}
            onClick={() => {
              update(cardInfo, { deleted: true });
            }}
            label={"delete_forever"}
          />
        </>
      ) : (
        <div>
          <Button
            className={cx(classesCss.Button, classesCss.Icon)}
            onClick={restoreWord}
            label={"восстановить"}
          />
          <div>Page: {cardInfo.page + 1}</div>
        </div>
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
