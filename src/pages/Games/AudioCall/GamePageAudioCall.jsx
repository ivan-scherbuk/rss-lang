import React, {useState, useCallback, useEffect, useMemo} from 'react';
import { getRandomNumber, shuffle } from '../../../helpers/gameUtils';
import { setStatusGame, setLevel } from '../../../redux/games/actions';
import {Grid, makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux"
import {useWords} from "../../../hooks/hooks.words"
// import classNames from "classnames";
import Loader from "../../../components/Loader";
import {levelSelector} from "../../../redux/games/selectors";
import Levels from "../common/Levels";
import Statistics from "../common/Statistics";
import Lives from "../common/Lives";
import CloseButton from "../common/CloseButton";
import SoundButton from "../common/SoundButton";
import correctSound from "../../../assets/audio/correct.mp3";
import errorSound from "../../../assets/audio/error.mp3";
import FullScreenButton from "../common/FullScreenButton";
import classesCss from "./AudioCallGame.module.scss";



const NUMBER_OF_WORDS = 20;

export default function AudioCall() {

    const activeLevel = useSelector(levelSelector);
    const dispatch = useDispatch();

    const [answer, setAnswer] = useState('');
    const [statisticsArr, setStatisticsArr] = useState([]);
    const [arrOfWords, setArrOfWords] = useState([]);
    const [btnClicked, setBtnClicked] = useState(false);
    const [isExit, setIsExit] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [livesCount, setLivesCount] = useState(5);
    const [rightAnswers, setrightAnswers] = useState(0);
    const [wrongAnswers, setwrongAnswers] = useState(0);
    const [soundOn, setSoundOn] = useState(false);
    const [word, setWord] = useState('');
    const [wordTranslation, setWordTranslation] = useState('');
    const [wordID, setWordID] = useState('');
    const [wordAudio, setWordAudio] = useState('');
    const [wordTranscription, setWordTranscription] = useState('');
    const [wordCounter, setWordCounter] = useState(0);

    const {currentWords, getWordsChunk, onLoading} = useWords();
    const audioPlayer = new Audio();
    audioPlayer.volume = 0.1;

    const classes = {};

    const randomPage = useMemo(() => {
        return getRandomNumber(0, 19);
    },[]);

    useEffect(() => {
        getWordsChunk(activeLevel - 1, randomPage);
    },[randomPage, getWordsChunk, activeLevel]);

    const shuffledWords = useMemo(() => {
        return (currentWords) ? shuffle(currentWords) : null;
    }, [currentWords]);

    const handleGameOver = useCallback(() => {
            setIsGameOver(true);
            setWord(' ');
            setArrOfWords([]);
            setLivesCount(0);
        },
        []);


    useEffect(() => {
        // console.log(shuffledWords);

        if (shuffledWords !== null && shuffledWords.length && livesCount && wordCounter < NUMBER_OF_WORDS) {
            const f1 = (randomNumber) => {
                const newWordTranslation = shuffledWords[randomNumber].wordTranslate;
                setWord(shuffledWords[randomNumber].word);
                setWordID(shuffledWords[randomNumber].id);
                setWordAudio(shuffledWords[randomNumber].audio);
                setWordTranscription(shuffledWords[randomNumber].transcription);
                setWordTranslation(newWordTranslation);
                setArrOfWords(setWordsTranslation(shuffledWords, newWordTranslation));
            };

            f1(wordCounter);
        }

        if (wordCounter === NUMBER_OF_WORDS) {
            handleGameOver();
        }
    }, [livesCount, wordCounter, getWordsChunk, statisticsArr, handleGameOver, activeLevel, shuffledWords]);

    const updateStats = useCallback((isCorrect) => {
        setStatisticsArr([...statisticsArr, {
            'word': word,
            'id': wordID,
            'audio': wordAudio,
            'transcription': wordTranscription,
            'translation': wordTranslation,
            'isCorrect': isCorrect,
        }]);
    }, [word, wordID, wordAudio, wordTranscription, wordTranslation, statisticsArr]);
    // console.log({wordAudio})
    useEffect(() => {
        const timer = setTimeout(() => {
            if (livesCount && shuffledWords && shuffledWords.length && !btnClicked) {
                setAnswer(false);
                setLivesCount(livesCount - 1);
                updateStats(false);
                playSound(false, soundOn);
                setWordCounter(wordCounter + 1);
            }
        }, 6000);

        return () => {
            clearTimeout(timer);
        };
    }, [shuffledWords, updateStats, livesCount, answer, btnClicked, soundOn, wordCounter]);

    const handleExit = useCallback(() => {
        dispatch(setStatusGame(false));
        setIsExit(false);
    }, [dispatch]);

    const handleChangeSound = useCallback(() => {
        setSoundOn(!soundOn);
    },[soundOn]);

    const checkAnswer = useCallback((wordActive, answerActive) => {
        let correct = wordActive === answerActive;
        updateStats(correct);
        setAnswer(correct);
        setWordCounter(wordCounter + 1);

        if (correct) {
            setrightAnswers(rightAnswers + 1);
            playSound(true, soundOn);
        } else {
            setLivesCount(livesCount - 1);
            setwrongAnswers(wrongAnswers + 1);
            playSound(false, soundOn);
        }
    }, [livesCount, updateStats, wrongAnswers, wordCounter, rightAnswers, soundOn]);

    const changeLevel = useCallback((levelProps) => {
        if (activeLevel !== levelProps) {
            dispatch(setLevel(levelProps));
        }
    }, [dispatch, activeLevel]);

    const handleWordClick = useCallback((itemWord) => () => {
        setBtnClicked(true);
        setWord("");
        setTimeout(() => {
            setBtnClicked(false);
            checkAnswer(itemWord, wordTranslation);
            setTimeout(() => {
                setAnswer(false);
                setBtnClicked(false);
            }, 500);
        }, 350);
    },[checkAnswer, wordTranslation]);

    function playAudio(url) {
      audioPlayer.src = url;
      audioPlayer.load();
      audioPlayer.play();

  }

    return (
        <>
        {onLoading ? <Loader/> : (
            <Grid className={classesCss.containerGame}>
                {isGameOver && (
                    <Statistics
                        statisticsArr={statisticsArr}
                        rightAnswers={rightAnswers}
                        wrongAnswers={wrongAnswers}
                        toNewGame={handleExit}
                    />)}

                {!isGameOver && (<Grid container justify="space-between" alignItems="center">
                    <Grid item xs={4}>
                        <Levels changeActiveLevel={changeLevel} currentLevel={activeLevel} />
                    </Grid>
                    <Grid item xs={4} container justify="center">
                        <Lives livesCount={livesCount} gameOver={handleGameOver}/>
                    </Grid>
                    <Grid item xs={4} container justify="flex-end">
                        <SoundButton onClick={handleChangeSound} isEnabled={soundOn}/>
                        <FullScreenButton/>
                        <CloseButton/>
                    </Grid>
                </Grid>)}

                {!isGameOver && (<Grid container
                      direction="column"
                      justify="space-between"
                      alignItems="center"
                      className={classesCss.gameContainer}>

                    <div
                        className={classesCss.wordAudio}
                    >
                        <h3 onClick ={()  => {
                          playAudio(wordAudio)
                          // console.log(wordAudio)
                        }
                        }>campaign</h3>
                    </div>
                    <Grid container justify="space-evenly" alignItems="center" className={classesCss.listWords}>
                        {
                            arrOfWords.map((itemWord) => (
                                <button
                                    key={itemWord}
                                    onClick={handleWordClick(itemWord)}
                                    className={classesCss.wordButton}
                                >
                                    {itemWord}
                                </button>
                            ))
                        }
                    </Grid>


                </Grid>)}
        </Grid>)}
            <audio id="correctSound" src={correctSound}/>
            <audio id="errorSound" src={errorSound}/>
        </>
    );
};

const setWordsTranslation = (words, newWordTranslation) => {
    const arrOfTranslations = [];
    arrOfTranslations.push(newWordTranslation);

    while (arrOfTranslations.length < 4) {
        const translation = words[getRandomNumber(0, words.length - 1)].wordTranslate;
        if (!arrOfTranslations.includes(translation)) {
            arrOfTranslations.push(translation);
        }
    }
    return shuffle(arrOfTranslations);
};

const playSound = (isCorrect, soundOn) => {
    const correctSound = document.querySelector("#correctSound");
    const errorSound = document.querySelector("#errorSound");
    if (soundOn) {
        isCorrect ? correctSound.play() : errorSound.play();
    }
};