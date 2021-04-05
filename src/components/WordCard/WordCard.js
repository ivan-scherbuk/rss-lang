import React, { useEffect, useState } from "react";
import classesCss from "./WordCard.module.scss";
import { SETTINGS } from "../../settings";
import SoundButton from "../Buttons/SoundButton";
import FastAverageColor from "fast-average-color";
import ButtonsBlock from "./ButtonsBlock";
import cx from "classnames";
import { useSelector } from "react-redux";

const fac = new FastAverageColor();

export default function WordCard({cardInfo}){
  const {
    optional,
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
  const [failCounter, setFailedCounter] = useState(0);
  const [successCounter, setSuccessCounter] = useState(0);
  const {isLogged} = useSelector(store => store.user)


  let notification;
  if (optional?.difficulty === "hard") {
    notification = "notification_important";
  } else {
    notification = "";
  }

  const audioPlayer = new Audio();
  audioPlayer.volume = 0.1;

   function playAudio(url, phase) {
    audioPlayer.src = `${SETTINGS.SERVER}/${url}`;
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

    let playNextAudio = function(){
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
      style={{background: averageColorData?.color || "white"}}
      className={classesCss.Card}
    >
      <div
        style={{backgroundImage: `url(${SETTINGS.SERVER}/${image})`}}
        className={classesCss.HeaderBlock}
      >
        <div
          className={classesCss.Overlay}
          style={{background: `linear-gradient(transparent, ${averageColorData?.color})` || "transparent"}}
        >
          {isLogged && (
            <ButtonsBlock
              audio={audio}
              cardInfo={cardInfo}
              successCounter={successCounter}
              failCounter={failCounter}
              notification={notification}
            />
          )}
          <div className={cx(classesCss.WordBlock)}>
            <div className={classesCss.PrimaryBlock}>
              <h3>{word}</h3>
            </div>
            <div className={classesCss.SecondaryBlock}>
              <div>{wordTranslate}</div>
              <div>{transcription}</div>
              <SoundButton
                onClick={() => playAudio(audio)}
                file={`${SETTINGS.SERVER}/${audio}`}
                className={cx(classesCss.SoundButton, classesCss.Button)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classesCss.CardContent}>
        <div className={classesCss.WordBlock}>
          <div dangerouslySetInnerHTML={{__html: textMeaning}}/>
          <div dangerouslySetInnerHTML={{__html: textExample}} className={classesCss.Example}/>
        </div>
        <div className={classesCss.WordBlock}>
          <div>{textMeaningTranslate}</div>
          <div className={classesCss.Example}>{textExampleTranslate}</div>
        </div>
      </div>
    </div>
  );
}
