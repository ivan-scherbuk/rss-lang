import React, { useEffect, useState } from "react";
import classesCss from "./WordCard.module.scss";

export default function WordCard(props) {
    let {id, group, page, word, image, audio, audioMeaning, audioExample, textMeaning, textExample, transcription, wordTranslate, textMeaningTranslate, textExampleTranslate} = props.cardInfo
    const audioPlayer = new Audio();
    audioPlayer.volume = 0.1;

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

    return (
        <div className={classesCss['word-card-container']}>
            {/* <img src={image}/> */}
            <div className={classesCss['word-img']} style={{backgroundImage: `url(${image})`}}></div>
            <div>
                <div className={classesCss['icon']} onClick = {() =>
                    playAudio(audio)

                }>volume_up</div>
                <div className={classesCss['icon']}>add_alert</div>
                <div className={classesCss['icon']}>delete_forever</div>
            </div>
            <div className={classesCss['contetnt-wrapper']}>
                <div className={classesCss['word-text']}>{word}</div>
                <div className={classesCss['word-text']}>{transcription}</div>
                <div className={classesCss['word-text']}>{wordTranslate}</div>
                <div dangerouslySetInnerHTML={{__html: textMeaning}} className={classesCss['word-content']}></div>
                <div className={classesCss['word-content']}>{textMeaningTranslate}</div>
                <div  dangerouslySetInnerHTML={{__html: textExample}} className={classesCss['word-content']}></div>
                <div className={classesCss['word-content']}>{textExampleTranslate}</div>
            </div>
            <div className={classesCss['icon']}>notification_important</div>
        </div>
    )
}