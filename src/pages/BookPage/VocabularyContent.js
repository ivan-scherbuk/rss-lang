import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import WordCard from "../../components/WordCard/WordCard";
import { checkGroup, checkPage } from "../../helpers/utils.checkers";
import { useUserWordsGroup } from "../../hooks/hooks.user";
import {
  setCurrentGroup,
  setCurrentPage,
  setCurrentVocabularyPage,
  setVocabularyMode,
} from "../../redux/actions.book";
import classesCss from "./BookPage.module.scss";
import cx from "classnames"
import {
  MODE_VOCABULARY,
  VOCABULARY_MODE_DELETED,
  VOCABULARY_MODE_DIFFICULT,
  VOCABULARY_MODE_NORMAL,
  WORD_HARD,
} from "../../settings";

export default function VocabularyContent({setTotalPagesCount}){
  const {getUserWordsGroup, onLoading, currentUserWordsGroup} = useUserWordsGroup();
  const [wordsToRender, setWordsToRender] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {vocabularyMode: urlVocabularyMode = VOCABULARY_MODE_NORMAL} = useLocation()
  const {group: urlGroup, page: urlPage = 1} = useParams();
  const group = checkGroup(urlGroup - 1);
  const page = checkPage(urlPage - 1);

  function getVocabularyUrl(mode){
    return {
      pathname: `/${MODE_VOCABULARY}/${group + 1}/1`,
      vocabularyMode: mode
    }
  }

  useEffect(() => {
    if (user.words) getUserWordsGroup(group);
  }, [user, group, urlVocabularyMode]);

  useEffect(() => {
    if (currentUserWordsGroup) {
      setWordsToRender(
        Object.values(currentUserWordsGroup)
        .flat()
        .filter(({optional, difficulty}) => {
          const isDifficultyHard = difficulty === WORD_HARD
          if (urlVocabularyMode === VOCABULARY_MODE_DIFFICULT) return isDifficultyHard;
          if (urlVocabularyMode === VOCABULARY_MODE_DELETED) return optional.deleted;
          return (isDifficultyHard || (optional.failCounter + optional.successCounter)) && !optional.deleted;
        }),
      );
    }
  }, [currentUserWordsGroup, urlVocabularyMode]);

  useEffect(() => {
    if (wordsToRender && !Array.isArray(wordsToRender[0])) {
      const maxWordsInPage = 20;
      let pagesNumber = Math.ceil(wordsToRender.length / maxWordsInPage);
      setTotalPagesCount(pagesNumber);
      let helpArr = [];
      for (let i = 0; i < pagesNumber; i++) {
        helpArr.push(
          wordsToRender.slice(i * maxWordsInPage, maxWordsInPage * (i + 1)),
        );
      }
      setWordsToRender(helpArr);
    }
  }, [wordsToRender]);

  useEffect(() => {
    dispatch(setCurrentGroup(group));
  }, [group, dispatch]);

  useEffect(() => {
    dispatch(setCurrentVocabularyPage(page));
  }, [page, dispatch]);

  useEffect(() => {
    dispatch(setVocabularyMode(urlVocabularyMode))
  }, [urlVocabularyMode, dispatch])

  return (
    <div>
      <div className={classesCss.BookContent}>
        <NavLink
          className={classesCss.VocabularySection}
          to={getVocabularyUrl()}
        >
          Изучаемые
        </NavLink>
        <NavLink
          className={classesCss.VocabularySection}
          to={getVocabularyUrl(VOCABULARY_MODE_DIFFICULT)}
        >
          Сложные
        </NavLink>
        <NavLink
          className={classesCss.VocabularySection}
          to={getVocabularyUrl(VOCABULARY_MODE_DELETED)}
        >
          Удаленные
        </NavLink>
      </div>
      <div className={classesCss.BookContent}>
        {Array.isArray(wordsToRender) &&
        Array.isArray(wordsToRender[0]) &&
        wordsToRender[page].map((word) => {
          return (
            <WordCard
              className={cx({
                [classesCss.test]:
                urlVocabularyMode === VOCABULARY_MODE_NORMAL
                && word.difficulty === WORD_HARD,
              })
              }
              key={word.id}
              cardInfo={word}
            />
          );
        })}
      </div>
    </div>
  );
}
