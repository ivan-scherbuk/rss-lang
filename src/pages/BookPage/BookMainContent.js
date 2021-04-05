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
    pages,
    setPages,
    setCurrentPage,
    setSuccessCounter,
    setFailCounter,
    setTotalCounter,
  } = props;
  const { currentWords, getWordsChunk, onLoading } = useWords();
  const {
    currentUserWords,
    getUserWordsChunk,
    onLoading: onUserLoading,
  } = useUserWords();
  const { currentGroup } = useParams();
  const user = useSelector((state) => state.user);
  const [wordsToRender, setWordsToRender] = useState();
  const [deletedWords, setDeletedWord] = useState([]);

  useEffect(() => {
    setGroupPath("");
  }, []);

  useEffect(() => {
    if (pages) {
      setSuccessCounter(0);
      setFailCounter(0);
      setTotalCounter(0);
      getWordsChunk(currentGroup - 1, pages[currentPage]);
      sessionStorage.setItem("currentPage", currentPage);
    }
  }, [currentPage, pages]);

  useEffect(() => {
    if (pages && user.words) {
      getUserWordsChunk(currentGroup - 1, pages[currentPage]);
      let gameStateObj = { group: currentGroup - 1, page: pages[currentPage] };
      sessionStorage.setItem("gameState", JSON.stringify(gameStateObj));
      setGameState(gameStateObj);
    }
  }, [user, currentPage, pages]);

  useEffect(() => {
    if (wordsToRender) {
      let success = 0,
        fail = 0,
        total = 0,
        deleted = 0;
      for (let i = 0; i < wordsToRender.length; i++) {
        if (wordsToRender[i].optional?.deleted) {
          deleted += 1;
        }
        if (
          (wordsToRender[i].optional?.successCounter > 0 ||
            wordsToRender[i].optional?.failCounter > 0 ||
            wordsToRender[i].difficulty === "hard") &&
          !wordsToRender[i].optional?.deleted
        ) {
          success += wordsToRender[i].optional.successCounter;
          fail += wordsToRender[i].optional.failCounter;
          total += 1;
        }
      }
      if (deleted === 20) {
        // setPages(pages.splice(currentPage, 1));
        // localStorage.setItem("pages", JSON.stringify(pages));
        // setTotalPagesCount(pages.length);
        // window.location.reload();
      }
      setSuccessCounter(success);
      setFailCounter(fail);
      setTotalCounter(total);
    }
  }, [wordsToRender]);

  useEffect(() => {
    if (currentWords) {
      setWordsToRender(
        currentWords.map((word) => {
          return findUserWord(word);
        })
      );
    }
  }, [currentWords, currentUserWords, deletedWords]);

  function findUserWord(word) {
    const index = deletedWords.findIndex(
      (deletedWord) => deletedWord.id === word.id
    );
    if (index !== -1) {
      return deletedWords[index];
    }
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
      {wordsToRender &&
        wordsToRender.map((word) => {
          if (!word.optional?.deleted) {
            return (
              <WordCard
                className={cx({
                  [classesCss.DifficultWord]: word.difficulty === "hard",
                  [classesCss.DeletedWord]: word.optional?.deleted,
                })}
                key={word.id}
                cardInfo={word}
                buttons={buttons}
                isLogged={isLogged}
                wordsToRender={wordsToRender}
                deletedWords={deletedWords}
                setDeletedWord={setDeletedWord}
              />
            );
          }
        })}
    </div>
  );
}
