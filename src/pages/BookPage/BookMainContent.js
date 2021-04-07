import React, { useEffect, useState } from "react";
import { useWords } from "../../hooks/hooks.words";
import WordCard from "../../components/WordCard/WordCard.js";
import { useParams, useHistory } from "react-router-dom";
import { useUserWords } from "../../hooks/hooks.user";
import { useDispatch, useSelector } from "react-redux";
import classesCss from "./BookPage.module.scss";
import cx from "classnames";
import { checkGroup, checkPage } from "../../helpers/utils.checkers";
import {
  removePagesFromPageList,
  setCurrentGroup,
  setCurrentPage, setCurrentWords,
} from "../../redux/actions.book";
import { MODE_BOOK, WORD_HARD } from "../../settings";

export default function BookMainContent({setTotalValues, setTotalPagesCount}) {

  const [isPagesFirstDeleteComplete, setPageFirstDeleteComplete] = useState(false)
  const { currentWords, getWordsChunk } = useWords();
  const { currentUserWords, getUserWordsChunk } = useUserWords();
  const { isLogged, words: userWords } = useSelector((state) => state.user);
  const {currentWords: wordsToRender, pagesList, currentPageIndex} = useSelector((state) => state.book)

  const dispatch = useDispatch();

  const history = useHistory()
  const { group: urlGroup, page: urlPage = 1 } = useParams();
  const group = checkGroup(urlGroup - 1);
  const page = checkPage(urlPage - 1);

  useEffect(() => {
    function findUserWord(word) {
      const userWord = currentUserWords.find(
        (userWord) => userWord.id === word.id
      );
      if (userWord) return userWord;
      return word;
    }
    if (currentWords?.length) {
      if (isLogged && currentUserWords?.length) {
        dispatch(setCurrentWords(currentWords.map((word) => findUserWord(word))))
      } else {
        dispatch(setCurrentWords([...currentWords]))
      }
    }
  }, [currentWords, currentUserWords, isLogged, dispatch]);

  useEffect(() => {
    if (group !== undefined && page !== undefined) {
      getWordsChunk(group, page);
      if (isLogged) getUserWordsChunk(group, page);
    }
  }, [group, page, getWordsChunk, getUserWordsChunk, isLogged]);

  useEffect(() => {
    if (wordsToRender) {
      const totals = {
        success: 0,
        fail: 0,
        learned: 0
      }
      wordsToRender.forEach(({optional, difficulty}) => {
        if(((optional?.successCounter + optional?.failCounter) || difficulty === WORD_HARD)
          && !optional?.deleted){
          totals.success += optional.successCounter || 0
          totals.fail += optional.failCounter || 0
          totals.learned += 1
        }
      })
      setTotalValues(totals)


    }
  }, [wordsToRender, setTotalValues]);

  useEffect(() => {
    if(!isPagesFirstDeleteComplete && group !== undefined
      && userWords && userWords[group]){
      const pagesToRemove = [];
      for (let i in userWords[group]) {
        if (userWords[group].hasOwnProperty(i)
          && userWords[group][i].length === 20
          && userWords[group][i].every(({optional}) => optional?.deleted)
        ){
          pagesToRemove.push(i);
        }
      }
      setPageFirstDeleteComplete(true)
      if (pagesToRemove.length) dispatch(removePagesFromPageList(group, pagesToRemove));
    }
  }, [group, userWords, dispatch, isPagesFirstDeleteComplete]);

  useEffect(() => {
    if(isLogged)
    if(isPagesFirstDeleteComplete
      && userWords && userWords[group] && userWords[group][page].every(({optional}) => optional?.deleted)){
      dispatch(removePagesFromPageList(group, page));
      const lastPageListIndex = pagesList[group].length - 1
      const newPageIndex = currentPageIndex > lastPageListIndex - 1 ? lastPageListIndex - 1 : currentPageIndex
      if(currentPageIndex !== newPageIndex) dispatch(setCurrentPage(newPageIndex ))
      history.push(`/${MODE_BOOK}/${group + 1}/${pagesList[group][newPageIndex] + 1}`)
    }
  }, [userWords,
    group,
    page,
    isPagesFirstDeleteComplete,
    dispatch,
    currentPageIndex,
    history,
    pagesList,
    isLogged])


  useEffect(() => {
    setPageFirstDeleteComplete(false)
    dispatch(setCurrentGroup(group));
  }, [group, dispatch]);

  useEffect(() => {
    const currentExistingPage = pagesList[group].findIndex(existingPage => existingPage === Number(page))
    dispatch(setCurrentPage(currentExistingPage));
  }, [page, dispatch, group, pagesList]);

  useEffect(() => {
    setTotalPagesCount(pagesList[group].length);
  }, [setTotalPagesCount, pagesList, group]);

  return (
    <div className={classesCss.BookContent}>
      {wordsToRender?.length
      && wordsToRender.map((word) => {
          if (!word.optional?.deleted) {
            return (
              <WordCard
                className={cx({
                  [classesCss.DifficultWord]: word.difficulty === WORD_HARD,
                  [classesCss.DeletedWord]: word.optional?.deleted,
                })}
                key={word.id}
                cardInfo={word}
              />
            );
          }
          return null;
        })}
    </div>
  );
}