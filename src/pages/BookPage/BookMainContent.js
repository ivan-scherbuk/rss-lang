import React, { useEffect } from "react";
import { useWords } from "../../hooks/hooks.words";
import WordCard from "../../components/WordCard/WordCard.js";
import { useParams } from "react-router";
import { useUserWords } from "../../hooks/hooks.user";
import { useSelector } from "react-redux";
import classesCss from "./BookPage.module.scss";
import cx from "classnames"

export default function BookMainContent(props){
  const {
    setGroupPath,
      currentPage,
      setGameState,
      totalPagesCount,
      setTotalPagesCount,
      buttons,
  } = props
  const {currentWords, getWordsChunk, onLoading} = useWords();
  const {
    currentUserWords,
    getUserWordsChunk,
    onLoading: onUserLoading,
  } = useUserWords();
  const {currentGroup} = useParams();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setGroupPath("");
  }, []);

  useEffect(() => {
    getWordsChunk(currentGroup - 1, currentPage);
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (user.words) {
      getUserWordsChunk(currentGroup - 1, currentPage);
      let gameStateObj = {group: currentGroup - 1, page: currentPage};
      sessionStorage.setItem("gameState", JSON.stringify(gameStateObj));
      setGameState(gameStateObj);
    }
  }, [user, currentPage]);

  // useEffect(() => {
  //   if (currentUserWords && currentUserWords.length === 20) {
  //     let deletedWords = currentUserWords.filter(
  //       (word) => word.optional.optional
  //     );
  //     if (deletedWords) {
  //       totalSuccess =
  //     }
  //   }
  // }, [currentUserWords]);

  function findUserWord(word){
    if (currentUserWords?.length) {
      const userWord = currentUserWords.find(userWord => userWord.id === word.id)
      if (userWord) return userWord
    }
    return word
  }

  return (
    <div className={classesCss.CardsContainer}>
      {/*<span>Изучаемых слов:</span>*/}
      {/*<span>Успешно: 0</span>*/}
      {/*<span>Ошибок: 0</span>*/}
      {currentWords &&
      currentWords.map((word) => {
        const currentWordInfo = findUserWord(word);
        return (
            <WordCard
              className={cx({
                [classesCss.DifficultWord]: currentWordInfo.difficulty === "hard",
                [classesCss.DeletedWord]: currentWordInfo.optional?.deleted,
              })}
              key={word.id}
              cardInfo={currentWordInfo}
              buttons={buttons}/>
        );
      })}
    </div>
  );
}
