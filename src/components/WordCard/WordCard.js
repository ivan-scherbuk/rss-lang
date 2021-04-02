import React, { useEffect, useState } from "react";
import classesCss from "./WordCard.module.scss";
import { useUserWordUpdate } from "../../hooks/hooks.user";
import { useParams } from "react-router";

export default function WordCard({ cardInfo, translate, buttons }) {
  let {
    id,
    group,
    page,
    word,
    image,
    audio,
    audioMeaning,
    audioExample,
    textMeaning,
    textExample,
    transcription,
    wordTranslate,
    textMeaningTranslate,
    textExampleTranslate,
  } = cardInfo;
  const [failedCounter, setFailedCounter] = useState(0);
  const [successCounter, setSuccessCounter] = useState(0);
  useEffect(() => {
    if (cardInfo.optional && cardInfo.optional.optional) {
      setFailedCounter(cardInfo.optional.optional.failCounter);
      setSuccessCounter(cardInfo.optional.optional.successCounter);
    }
  }, []);
  const { currentSectionVocabulary } = useParams();
  const { update, updatedWord, onError } = useUserWordUpdate();
  const audioPlayer = new Audio();
  audioPlayer.volume = 0.1;
  const [isForceOpened, setForceOpened] = useState(false);
  let notification;
  if (cardInfo.optional?.difficulty === "hard") {
    notification = "notification_important";
  } else {
    notification = "";
  }

  const restoreWord = () => {
    if (currentSectionVocabulary === "difficult") {
      update(cardInfo, {
        difficulty: "normal",
        successCounter: successCounter,
        failCounter: failedCounter,
        deleted: cardInfo.optional.deleted,
      });
    }
    if (currentSectionVocabulary === "delete") {
      update(cardInfo, {
        difficulty: cardInfo.difficulty,
        successCounter: successCounter,
        failCounter: failedCounter,
        deleted: false,
      });
    }
  };

  function playAudio(url, phase) {
    audioPlayer.src = url;
    audioPlayer.load();
    audioPlayer.play();

    let nextPhase;
    let nextAudio;

    if (phase === undefined) {
      nextPhase = "second";
      nextAudio = audioMeaning;
    }

    if (phase === "second") {
      nextPhase = "third";
      nextAudio = audioExample;
    }

    if (phase === "third") {
      return;
    }

    let playNextAudio = function () {
      audioPlayer.removeEventListener("ended", playNextAudio);
      playAudio(nextAudio, nextPhase);
    };
    audioPlayer.addEventListener("ended", playNextAudio);
  }

  // if (cardInfo.optional?.deleted && !isForceOpened) {
  //   return (
  //     <div className={classesCss["WordCardContainer"]}>
  //       <div
  //         className={classesCss["WordText"]}
  //         onClick={() => setForceOpened(true)}
  //       >
  //         {word}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={classesCss["WordCardContainer"]}>
      {/* <img src={image}/> */}
      <div
        className={classesCss["WordImg"]}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div>
        <div className={classesCss["Icon"]} onClick={() => playAudio(audio)}>
          volume_up
        </div>
        {["difficult", "delete"].includes(currentSectionVocabulary) ? (
          <div onClick={restoreWord}>Восстановить</div>
        ) : (
          buttons === "y" && (
            <div>
              <div
                className={classesCss["Icon"]}
                onClick={() => update(cardInfo, { difficulty: "hard" })}
              >
                add_alert
              </div>
              <div
                className={classesCss["Icon"]}
                onClick={() => update(cardInfo, { deleted: true })}
              >
                delete_forever
              </div>
            </div>
          )
        )}
      </div>
      <div className={classesCss["ContetntWrapper"]}>
        <div className={classesCss["WordText"]}>{word}</div>
        <div className={classesCss["WordText"]}>{transcription}</div>
        {!(translate === "n" && currentSectionVocabulary === "learn") && (
          <div className={classesCss["WordText"]}>{wordTranslate}</div>
        )}
        <div
          dangerouslySetInnerHTML={{ __html: textMeaning }}
          className={classesCss["WordContent"]}
        ></div>
        {!(translate === "n" && currentSectionVocabulary === "learn") && (
          <div className={classesCss["WordContent"]}>
            {textMeaningTranslate}
          </div>
        )}
        <div
          dangerouslySetInnerHTML={{ __html: textExample }}
          className={classesCss["WordContent"]}
        ></div>
        {!(translate === "n" && currentSectionVocabulary === "learn") && (
          <div className={classesCss["WordContent"]}>
            {textExampleTranslate}
          </div>
        )}
      </div>
      <div className={classesCss["NotificationWrapper"]}>
        <div className={classesCss["Icon"]}>{notification}</div>
        {["difficult", "delete"].includes(currentSectionVocabulary) && (
          <div>Page: {page + 1}</div>
        )}
        <div className={classesCss["ResultContainer"]}>
          <div className={classesCss["ResultWrapper"]}>
            <span
              className={`${classesCss["Icon"]} ${classesCss["Icon-succsess"]}`}
            >
              thumb_up_off_alt
            </span>
            <span
              className={classesCss["result-counter"]}
            >{`:${successCounter}`}</span>
          </div>
          <div className={classesCss["ResultWrapper"]}>
            <span
              className={`${classesCss["Icon"]} ${classesCss["Icon-failture"]}`}
            >
              thumb_down_off_alt
            </span>
            <span
              className={classesCss["result-counter"]}
            >{`:${failedCounter}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
