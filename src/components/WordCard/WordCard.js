import React, { useEffect, useState } from "react";
import classesCss from "./WordCard.module.scss";
import { SETTINGS } from "../../settings";
import { useParams } from "react-router";
import SoundButton from "../Buttons/SoundButton";
import FastAverageColor from "fast-average-color";
import ButtonsBlock from "./ButtonsBlock";
import cx from "classnames";

const fac = new FastAverageColor();

export default function WordCard({
  cardInfo,
  translate,
  buttons,
  isLogged,
  wordsToRender,
  setDeletedWord,
  deletedWords,
}) {
  let {
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
  const [averageColorData, setAverageColorData] = useState(null);
  const [failedCounter, setFailedCounter] = useState(0);
  const [successCounter, setSuccessCounter] = useState(0);
  const { currentSectionVocabulary } = useParams();
  const audioPlayer = new Audio();
  audioPlayer.volume = 0.1;
  const [isForceOpened, setForceOpened] = useState(false);
  let notification;
  if (cardInfo.optional?.difficulty === "hard") {
    notification = "notification_important";
  } else {
    notification = "";
  }

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

  useEffect(() => {
    if (cardInfo.optional) {
      setFailedCounter(cardInfo.optional.failCounter);
      setSuccessCounter(cardInfo.optional.successCounter);
    }
  }, []);

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

  if (!averageColorData) {
    fac
      .getColorAsync(`${SETTINGS.SERVER}/${image}`)
      .then((color) => {
        setAverageColorData({
          color: color.rgb,
          isLight: color.isLight,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div
      style={{
        background: averageColorData?.color || "white",
      }}
      className={classesCss.Card}
    >
      <div
        style={{ backgroundImage: `url(${SETTINGS.SERVER}/${image})` }}
        className={classesCss.HeaderBlock}
      >
        <div
          className={classesCss.Overlay}
          style={{
            background:
              `linear-gradient(transparent, ${averageColorData?.color})` ||
              "transparent",
          }}
        >
          {isLogged && (
            <ButtonsBlock
              audio={audio}
              currentSectionVocabulary={currentSectionVocabulary}
              cardInfo={cardInfo}
              buttons={buttons}
              page={page}
              successCounter={successCounter}
              failedCounter={failedCounter}
              notification={notification}
              wordsToRender={wordsToRender}
              deletedWords={deletedWords}
              setDeletedWord={setDeletedWord}
            />
          )}
          <div className={cx(classesCss.WordBlock)}>
            <div className={classesCss.PrimaryBlock}>
              <h3>{word}</h3>
            </div>
            <div className={classesCss.SecondaryBlock}>
              {!(translate === "n" && currentSectionVocabulary === "learn") && (
                <div>{wordTranslate}</div>
              )}
              <div>{transcription}</div>
              <SoundButton
                file={`${SETTINGS.SERVER}/${audio}`}
                className={cx(
                  classesCss.SoundButton,
                  classesCss.Button
                  //{[classesCss.WithShadow]:averageColorData?.isLight}
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classesCss.CardContent}>
        <div className={classesCss.WordBlock}>
          <div dangerouslySetInnerHTML={{ __html: textMeaning }} />
          <div
            dangerouslySetInnerHTML={{ __html: textExample }}
            className={classesCss.Example}
          />
        </div>
        {!(translate === "n" && currentSectionVocabulary === "learn") && (
          <div className={classesCss.WordBlock}>
            <div>{textMeaningTranslate}</div>
            <div className={classesCss.Example}>{textExampleTranslate}</div>
          </div>
        )}
      </div>
    </div>
  );
}
