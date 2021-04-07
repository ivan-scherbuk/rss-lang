import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {getRandomNumber, getUserData, populateStatistics, shuffle} from '../../../helpers/gameUtils';
import {Grid, makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux"
import classesCss from "./AudioCallGame.module.scss";
import classNames from "classnames";
import { SETTINGS } from "../../../settings";
import {statisticsSelector} from "../../../redux/games/selectors";
import Statistics from "../common/Statistics";
import Lives from "../common/Lives";
import SoundButton from "../common/SoundButton";
import correctSound from "../../../assets/audio/correct.mp3";
import errorSound from "../../../assets/audio/error.mp3";
import FullScreenButton from "../common/FullScreenButton";
import {addStatisticsThunk, getStatisticsThunk} from "../../../redux/games/thunk.statistics";


const NUMBER_OF_WORDS = 20;

export default function AudioCall(props) {

  const {words, onLoading, onWordSelect} = props;
  const allStatistics = useSelector(statisticsSelector);
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState('');
  const [statisticsArr, setStatisticsArr] = useState([]);
  const [arrOfWords, setArrOfWords] = useState([]);
  const [btnClicked, setBtnClicked] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [livesCount, setLivesCount] = useState(5);
  const [currentGameStatistics, setCurrentGameStatistics] = useState({
    rightAnswers: 0, wrongAnswers: 0, bestSeries: 0
  });
  const [soundOn, setSoundOn] = useState(false);
  const [word, setWord] = useState('');
  const [wordTranslation, setWordTranslation] = useState('');
  const [wordID, setWordID] = useState('');
  const [wordAudio, setWordAudio] = useState('');
  const [wordTranscription, setWordTranscription] = useState('');
  const [wordCounter, setWordCounter] = useState(0);
  // const [snakeSize, setSnakeSize] = useState(0.6);
  const [currentSeries, setCurrentSeries] = useState(0);
    const audioPlayer = new Audio();
    audioPlayer.volume = 0.1;

    const classes = {};

    const userId = useMemo(() => getUserData()?.id,[]);

    useEffect(() => {
      dispatch(getStatisticsThunk(userId));
    }, [dispatch, userId]);

    const handleGameOver = useCallback(() => {
        setIsGameOver(true);
        setWord(' ');
        setArrOfWords([]);
        setLivesCount(0);
        const updatesStatistics = populateStatistics(
          "audiocall", allStatistics, {...currentGameStatistics, wordCounter, createdOn: Date.now()}
          );
        updatesStatistics.learnedWords = wordCounter;
        dispatch(addStatisticsThunk(userId, updatesStatistics));
    }, [dispatch, currentGameStatistics, wordCounter, userId, allStatistics]);

    useEffect(() => {
        if (words !== null && words.length && livesCount && wordCounter < NUMBER_OF_WORDS) {
            const f1 = (randomNumber) => {
                const newWordTranslation = words[randomNumber].wordTranslate;
                setWord(words[randomNumber].word);
                setWordID(words[randomNumber].id);
                const previousWordAudioURL = wordAudio;
                setWordAudio(words[randomNumber].audio);
                setWordTranscription(words[randomNumber].transcription);
                setWordTranslation(newWordTranslation);
                setArrOfWords(setWordsTranslation(words, newWordTranslation));

                if (previousWordAudioURL !== words[randomNumber].audio && words[randomNumber].audio) {
                  playAudio(`${SETTINGS.SERVER}/${words[randomNumber].audio}`);
                }
            };

           f1(wordCounter);
        }

        if (wordCounter === NUMBER_OF_WORDS) {
            handleGameOver();
        }
    }, [livesCount, wordCounter, statisticsArr, handleGameOver, words]);

  function playAudio(url) {
      audioPlayer.src = url;
      audioPlayer.load();
      audioPlayer.play();

  }

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

    useEffect(() => {
        const timer = setTimeout(() => {
            if (livesCount && words && words.length && !btnClicked) {
                setLivesCount(livesCount - 1);
                updateStats(false);
                playSound(false, soundOn);
                setWordCounter(wordCounter + 1);
            }
        }, 6000);

        return () => {
            clearTimeout(timer);
        };
    }, [words, updateStats, livesCount, currentGameStatistics, btnClicked, soundOn, wordCounter]);

    const handleChangeSound = useCallback(() => {
        setSoundOn(!soundOn);
    },[soundOn]);

    const checkAnswer = useCallback((wordActive, answerActive) => {
        let correct = wordActive === answerActive;
        updateStats(correct);
        setAnswer(correct);
        setWordCounter(wordCounter + 1);

        if (correct) {
            // setSnakeSize(snakeSize + 0.02);
            // setCurrentGameStatistics({...currentGameStatistics, rightAnswers: currentGameStatistics.rightAnswers + 1});
            setCurrentSeries(currentSeries + 1);
            onWordSelect(currentChunk[wordCounter], {succeed: true});
            playSound(true, soundOn);
        } else {
          // currentGameStatistics.wrongAnswers = currentGameStatistics.wrongAnswers + 1;
          setLivesCount(livesCount - 1);
          playSound(false, soundOn);
          onWordSelect(currentChunk[wordCounter], {failed: true});

          if (currentSeries >= currentGameStatistics.bestSeries) {
            currentGameStatistics.bestSeries = currentSeries;
            setCurrentSeries(0);
          }

          setCurrentGameStatistics({...currentGameStatistics});
        }
    }, [currentChunk, onWordSelect, word, livesCount, updateStats, currentSeries, wordCounter, soundOn]);

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

    return (
        <>
          {onLoading ? <Grid container justify="center" alignItems="center">ЗАГРУЗКА</Grid> : (
            <Grid className={classesCss.containerGames}>
                {/* {isGameOver && (
                    <Statistics
                        statisticsArr={statisticsArr}
                        rightAnswers={currentGameStatistics.rightAnswers}
                        wrongAnswers={currentGameStatistics.wrongAnswers}
                    />)} */}

                <Grid container justify="space-between" alignItems="center">
                    <Grid item container justify="center" className={classesCss.gameIcons}>
                      <Lives livesCount={livesCount} gameOver={handleGameOver}/>
                      <SoundButton onClick={handleChangeSound} isEnabled={soundOn}/>
                      <FullScreenButton/>
                    </Grid>
                </Grid>)

                <Grid container
                      direction="column"
                      justify="space-between"
                      alignItems="center"
                      className={classesCss.gameContainer}>


                        <h3 onClick ={()  => {
                          playAudio(`${SETTINGS.SERVER}/${wordAudio}`)
                          // console.log(wordAudio)
                        }
                        } className={classesCss.wordAudio}>campaign</h3>

                    <Grid container justify="space-evenly" alignItems="center" className={classesCss.listWords}>
                        {
                            arrOfWords.map((itemWord) => (
                                <button
                                    key={itemWord}
                                    onClick={handleWordClick(itemWord)}
                                    className={classNames({
                                        [classesCss.wordButton]: true,
                                        [classesCss.bubble]: true,
                                        [classesCss.wordButtonRight]: btnClicked && itemWord === wordTranslation,
                                    })}
                                >
                                    {itemWord}
                                </button>
                            ))
                        }
                    </Grid>

                </Grid>)
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
