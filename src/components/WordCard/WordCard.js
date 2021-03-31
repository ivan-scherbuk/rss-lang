import React, { useEffect, useState } from "react";
import classesCss from "./WordCard.module.scss";
import {useUserWordUpdate} from '../../hooks/hooks.user'



export default function WordCard(props) {
    let {id, group, page, word, image, audio, audioMeaning, audioExample, textMeaning, textExample, transcription, wordTranslate, textMeaningTranslate, textExampleTranslate} = props.cardInfo
    // let {failedCounter, successCounter} = props.optional
    const { update, updatedWord, onError } = useUserWordUpdate()
    const audioPlayer = new Audio();
    audioPlayer.volume = 0.1;
    const [isForceOpened, setForceOpened] = useState(false)
    let notification
    if (props.cardInfo.optional?.difficulty === "hard") {
      notification = "notification_important"
    } else {
      notification = ""
    }


    function playAudio(url, phase) {
        audioPlayer.src = url;
        audioPlayer.load();
        audioPlayer.play();

        let nextPhase;
        let nextAudio;

        if (phase === undefined) {
            nextPhase = 'second';
            nextAudio = audioMeaning;
        }

        if (phase === 'second') {
            nextPhase = 'third';
            nextAudio = audioExample;
        }

        if (phase === 'third') {
            return;
        }

        let playNextAudio = function() {
            audioPlayer.removeEventListener('ended', playNextAudio);
            playAudio(nextAudio, nextPhase);

        }
        audioPlayer.addEventListener('ended', playNextAudio);
    }

    if (props.cardInfo.optional?.deleted && !isForceOpened) {
      return <div className={classesCss['WordCardContainer']}>
          <div className={classesCss['WordText']} onClick = {() =>
            setForceOpened(true)
          }>{word}</div>
        </div>

    }

    return (
        <div className={classesCss['WordCardContainer']}>
            {/* <img src={image}/> */}
            <div className={classesCss['WordImg']} style={{backgroundImage: `url(${image})`}}></div>
            <div>
                <div className={classesCss['Icon']} onClick = {() =>
                    playAudio(audio)

                }>volume_up</div>
                <div className={classesCss['Icon']} onClick = {() =>
                  update(props.cardInfo, {difficulty: 'hard'}) }>add_alert</div>
                <div className={classesCss['Icon']} onClick ={() =>
                  update(props.cardInfo, {deleted: true})

                }>delete_forever</div>
            </div>
            <div className={classesCss['ContetntWrapper']}>
                <div className={classesCss['WordText']}>{word}</div>
                <div className={classesCss['WordText']}>{transcription}</div>
                <div className={classesCss['WordText']}>{wordTranslate}</div>
                <div dangerouslySetInnerHTML={{__html: textMeaning}} className={classesCss['WordContent']}></div>
                <div className={classesCss['WordContent']}>{textMeaningTranslate}</div>
                <div  dangerouslySetInnerHTML={{__html: textExample}} className={classesCss['WordContent']}></div>
                <div className={classesCss['WordContent']}>{textExampleTranslate}</div>
            </div>
            <div className={classesCss['NotificationWrapper']}>
                <div className={classesCss['Icon']}>{notification}</div>
                <div className={classesCss['ResultContainer']}>
                  <div className={classesCss['ResultWrapper']}>
                      {/* <span className={`${classesCss['Icon']} ${classesCss['Icon-succsess']}`}>thumb_up_off_alt</span><span className={classesCss['result-counter']}>{`:${successCounter}`}</span> */}
                  </div>

                  <div className={classesCss['ResultWrapper']}>
                      {/* <span className={`${classesCss['Icon']} ${classesCss['Icon-failture']}`}>thumb_down_off_alt</span><span className={classesCss['result-counter']}>{`:${failedCounter}`}</span> */}
                  </div>
                </div>

            </div>
        </div>
    )
}