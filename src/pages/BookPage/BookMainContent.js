import React, { useEffect, useState } from "react";
import { useWords } from "../../hooks/hooks.words";
import WordCard from "../../components/WordCard/WordCard.js";
import { useParams } from "react-router";
import { useUserWords } from "../../hooks/hooks.user";
import { useSelector } from "react-redux";
import classesCss from "./BookPage.module.scss";
import cx from "classnames";

export default function BookMainContent(props) {
  const {
    setGroupPath,
    currentPage,
    setGameState,
    totalPagesCount,
    setTotalPagesCount,
    buttons,
    isLogged,
  } = props;
  const { currentWords, getWordsChunk, onLoading } = useWords();
  const {
    currentUserWords,
    getUserWordsChunk,
    onLoading: onUserLoading,
  } = useUserWords();
  const { currentGroup } = useParams();
  const user = useSelector((state) => state.user);
  const [successCounter, setSuccessCounter] = useState(0);
  const [failCounter, setFailCounter] = useState(0);
  const [totalCounter, setTotalCounter] = useState(0);

  useEffect(() => {
    setGroupPath("");
  }, []);

  useEffect(() => {
    setSuccessCounter(0);
    setFailCounter(0);
    setTotalCounter(0);
    getWordsChunk(currentGroup - 1, currentPage);
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (user.words) {
      getUserWordsChunk(currentGroup - 1, currentPage);
      let gameStateObj = { group: currentGroup - 1, page: currentPage };
      sessionStorage.setItem("gameState", JSON.stringify(gameStateObj));
      setGameState(gameStateObj);
    }
  }, [user, currentPage]);

  useEffect(() => {
    if (currentUserWords) {
      let success = 0,
        fail = 0,
        total = 0;
      for (let i = 0; i < currentUserWords.length; i++) {
        if (
          currentUserWords[i].optional.successCounter > 0 ||
          currentUserWords[i].optional.failCounter > 0 ||
          currentUserWords[i].difficulty === "hard"
        ) {
          success += currentUserWords[i].optional.successCounter;
          fail += currentUserWords[i].optional.failCounter;
          total += 1;
        }
      }
      setSuccessCounter(success);
      setFailCounter(fail);
      setTotalCounter(total);
    }
  }, [currentUserWords]);

  function findUserWord(word) {
    if (currentUserWords?.length) {
      const userWord = currentUserWords.find(
        (userWord) => userWord.id === word.id
      );
      if (userWord) return userWord;
    }
    return word;
  }

  return (
    <div className={classesCss.CardsContainer}>
      {isLogged && (
        <div>
          <div>Изучаемых слов: {totalCounter}</div>
          <div>Успешно: {successCounter}</div>
          <div>Ошибок: {failCounter}</div>
        </div>
      )}
      {currentWords &&
        currentWords.map((word) => {
          const currentWordInfo = findUserWord(word);
          return (
            <WordCard
              className={cx({
                [classesCss.DifficultWord]:
                  currentWordInfo.difficulty === "hard",
                [classesCss.DeletedWord]: currentWordInfo.optional?.deleted,
              })}
              key={word.id}
              cardInfo={currentWordInfo}
              buttons={buttons}
              isLogged={isLogged}
            />
          );
        })}
    </div>
  );
}
