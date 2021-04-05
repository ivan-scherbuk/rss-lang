import React, { useEffect } from "react";
import HardButton from "../Buttons/HardButton";
import classesCss from "./WordCard.module.scss";
import cx from "classnames";
import { useUserWordUpdate } from "../../hooks/hooks.user";

export default function ButtonsBlock(props) {
  const {
    currentSectionVocabulary,
    buttons,
    notification,
    page,
    cardInfo,
    wordsToRender,
    setDeletedWord,
    deletedWords,
  } = props;

  const { update } = useUserWordUpdate();

  const restoreWord = () => {
    if (currentSectionVocabulary === "difficult") {
      update(cardInfo, { difficulty: "normal" });
    }
    if (currentSectionVocabulary === "delete") {
      update(cardInfo, {
        deleted: false,
      });
    }
  };

  const {successCounter, failCounter} = cardInfo?.optional? cardInfo.optional : {}

  return (
    <div className={classesCss.ButtonBlock}>
      {["difficult", "delete"].includes(currentSectionVocabulary) ? (
        <div onClick={restoreWord}>Восстановить</div>
      ) : (
        buttons === "y" && (
          <>
            <HardButton
              className={cx(classesCss.Button, classesCss.HardButton)}
              onClick={() => {
                update(cardInfo, { difficulty: "hard" });
              }}
            />
            <div
              className={cx(classesCss.Button, classesCss.Icon)}
              onClick={() => {
                update(cardInfo, { deleted: true }).then((data) => {
                  const index = wordsToRender.findIndex(
                    (word) => word.id === data.wordId
                  );
                  setDeletedWord([
                    ...deletedWords,
                    {
                      ...wordsToRender[index],
                      optional: data.optional,
                    },
                  ]);
                });
              }}
            >
              delete_forever
            </div>
          </>
        )
      )}

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
