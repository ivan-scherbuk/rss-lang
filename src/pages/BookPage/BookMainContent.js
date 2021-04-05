import React, { useEffect, useState } from "react";
import { useWords } from "../../hooks/hooks.words";
import WordCard from "../../components/WordCard/WordCard.js";
import { useParams } from "react-router-dom";
import { useUserWords } from "../../hooks/hooks.user";
import { useDispatch, useSelector } from "react-redux";
import classesCss from "./BookPage.module.scss";
import cx from "classnames";
import { checkGroup, checkPage } from "../../helpers/utils.checkers";
import { removePagesFromPageList, setCurrentGroup, setCurrentPage } from "../../redux/actions.book";

export default function BookMainContent(){
  const {currentWords, getWordsChunk} = useWords();
  const {currentUserWords, getUserWordsChunk} = useUserWords();
  const {isLogged, words : userWords} = useSelector((state) => state.user);
  const [wordsToRender, setWordsToRender] = useState(null);
  const dispatch = useDispatch()

  const {group: urlGroup, page: urlPage = 1} = useParams();
  const group = checkGroup(urlGroup - 1)
  const page = checkPage(urlPage - 1)

  useEffect(() => {
    function findUserWord(word){
      const userWord = currentUserWords.find((userWord) => userWord.id === word.id);
      if (userWord) return userWord;
      return word;
    }

    if (currentWords?.length) {
      if (isLogged) {
        if (currentUserWords?.length) {
          setWordsToRender(currentWords.map(word => findUserWord(word)));
        }
      } else {
        setWordsToRender([...currentWords])
      }
    }
  }, [currentWords, currentUserWords, isLogged])

  useEffect(() => {
    if (group !== undefined && page !== undefined) {
      getWordsChunk(group, page)
      if (isLogged) getUserWordsChunk(group, page)
    }
  }, [group, page, getWordsChunk, getUserWordsChunk, isLogged])

  useEffect(() => {
    if(group !== undefined && userWords && userWords[group]){
      const pagesToRemove = []
      for(let i in userWords[group]){
        if(userWords[group].hasOwnProperty(i) && userWords[group][i].length === 20) pagesToRemove.push(i)
      }
      if(pagesToRemove.length) dispatch(removePagesFromPageList(group, pagesToRemove))
    }
  }, [group, userWords, dispatch])

  useEffect(() => {
    dispatch(setCurrentGroup(group))
  }, [group, dispatch])

  useEffect(() => {
    dispatch(setCurrentPage(page))
  }, [page, dispatch])

  return (
    <div className={classesCss.BookContent}>
      {wordsToRender?.length &&
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
            />
          );
        }
        return null
      })}
    </div>
  );
}











// useEffect(() => {
//   if (wordsToRender) {
//     let success = 0,
//       fail = 0,
//       total = 0,
//       deleted = 0;
//     for (let i = 0; i < wordsToRender.length; i++) {
//       if (wordsToRender[i].optional?.deleted) {
//         deleted += 1;
//       }
//       if (
//         (wordsToRender[i].optional?.successCounter > 0 ||
//           wordsToRender[i].optional?.failCounter > 0 ||
//           wordsToRender[i].difficulty === "hard") &&
//         !wordsToRender[i].optional?.deleted
//       ) {
//         success += wordsToRender[i].optional.successCounter;
//         fail += wordsToRender[i].optional.failCounter;
//         total += 1;
//       }
//     }
//     if (deleted === 20) {
//       // setPages(pagesList.splice(currentPageIndex, 1));
//       // localStorage.setItem("pagesList", JSON.stringify(pagesList));
//       // setTotalPagesCount(pagesList.length);
//       // window.location.reload();
//     }
//     setSuccessCounter(success);
//     setFailCounter(fail);
//     setTotalCounter(total);
//   }
// }, [wordsToRender]);
//
// useEffect(() => {
//   if (currentWords) {
//     setWordsToRender(
//       currentWords.map((word) => {
//         return findUserWord(word);
//       })
//     );
//   }
// }, [currentWords, currentUserWords, deletedWords]);
//


// useEffect(() => {
//   if (pagesList && user.words) {
//     getUserWordsChunk(group - 1, pagesList[currentPageIndex]);
//     let gameStateObj = { group: group - 1, page: pagesList[currentPageIndex] };
//     sessionStorage.setItem("gameState", JSON.stringify(gameStateObj));
//     setGameState(gameStateObj);
//   }
// }, [user, currentPageIndex, pagesList]);