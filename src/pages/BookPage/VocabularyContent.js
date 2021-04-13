import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import WordCard from "../../components/WordCard/WordCard";
import { checkGroup, checkPage } from "../../helpers/utils.checkers";
import { useUserWordsGroup } from "../../hooks/hooks.user";
import {
  setCurrentGroup,
  setVocabularyCurrentPage,
  setVocabularyMode,
  setVocabularyWords,
} from "../../redux/actions.book";
import classesCss from "./BookPage.module.scss";
import cx from "classnames";
import {
  MODE_VOCABULARY,
  SETTINGS,
  VOCABULARY_MODE_DELETED,
  VOCABULARY_MODE_DIFFICULT,
  VOCABULARY_MODE_NORMAL,
  WORD_HARD,
} from "../../settings";
import BookDisclaimerEmpty from "./BookDisclaimerEmpty";

const VOCABULARY_SECTIONS = [
  {
    mode: VOCABULARY_MODE_NORMAL,
    label: "Изучаемые",
  },
  {
    mode: VOCABULARY_MODE_DIFFICULT,
    label: "Сложные",
  },
  {
    mode: VOCABULARY_MODE_DELETED,
    label: "Удаленные",
  },
];

export default function VocabularyContent({
  setTotalPagesCount,
  setTotalValues,
  setLevelStyle,
}) {
  const { getUserWordsGroup, currentUserWordsGroup } = useUserWordsGroup();
  const [wordsToRender, setWordsToRender] = useState(null);
  const { words: userWords } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { state } = useLocation();
  const urlVocabularyMode = state
    ? state.vocabularyMode
    : VOCABULARY_MODE_NORMAL;
  const { group: urlGroup, page: urlPage = 1 } = useParams();
  const group = checkGroup(urlGroup - 1);
  const page = checkPage(urlPage - 1);

  function getVocabularyUrl(mode) {
    return {
      pathname: `/${MODE_VOCABULARY}/${group + 1}/1`,
      state: { vocabularyMode: mode },
    };
  }

  useEffect(() => {
    if (userWords[group] && Object.keys(userWords[group]))
      getUserWordsGroup(group);
  }, [userWords, group, getUserWordsGroup]);

  useEffect(() => {
    if (currentUserWordsGroup) {
      const userFlatWords = Object.values(currentUserWordsGroup)
        .flat()
        .filter(({ optional, difficulty }) => {
          const isDifficultyHard = difficulty === WORD_HARD;
          if (urlVocabularyMode === VOCABULARY_MODE_DIFFICULT)
            return isDifficultyHard && !optional.deleted;
          if (urlVocabularyMode === VOCABULARY_MODE_DELETED)
            return optional.deleted;
          return (
            (isDifficultyHard ||
              optional.failCounter + optional.successCounter) &&
            !optional.deleted
          );
        });
      const maxWordsInPage = SETTINGS.DEFAULT_WORD_CHUNK_LENGTH;
      const pagesNumber = Math.ceil(userFlatWords.length / maxWordsInPage);
      const slicedUserWords = [];
      for (let i = 0; i < pagesNumber; i++) {
        slicedUserWords.push(
          userFlatWords.slice(i * maxWordsInPage, maxWordsInPage * (i + 1))
        );
      }
      setWordsToRender(slicedUserWords);
      setTotalPagesCount(pagesNumber);
    }
  }, [currentUserWordsGroup, urlVocabularyMode, setTotalPagesCount]);

  useEffect(() => {
    dispatch(setCurrentGroup(group));
    setLevelStyle(group);
  }, [group, dispatch, setLevelStyle]);

  useEffect(() => {
    dispatch(setVocabularyCurrentPage(page));
  }, [page, dispatch]);

  useEffect(() => {
    dispatch(setVocabularyMode(urlVocabularyMode));
  }, [urlVocabularyMode, dispatch]);

  useEffect(() => {
    dispatch(setVocabularyWords(wordsToRender));
  }, [wordsToRender, dispatch]);

  useEffect(() => {
    if (wordsToRender) {
      const totals = {
        success: 0,
        fail: 0,
        learned: 0,
      };
      wordsToRender[page].forEach(({ optional, difficulty }) => {
        if (
          (optional?.successCounter + optional?.failCounter ||
            difficulty === WORD_HARD) &&
          !optional?.deleted
        ) {
          totals.success += optional.successCounter || 0;
          totals.fail += optional.failCounter || 0;
          totals.learned += 1;
        }
      });
      setTotalValues(totals);
    }
  }, [wordsToRender, setTotalValues, page]);

  return (
    <>
      <div className={cx(classesCss.VocabularyHeader)}>
        {VOCABULARY_SECTIONS.map((section) => (
          <NavLink
            key={section.label + section.mode}
            className={cx(classesCss.VocabularySection, {
              [classesCss.Active]: urlVocabularyMode === section.mode,
            })}
            to={getVocabularyUrl(section.mode)}
          >
            {section.label}
          </NavLink>
        ))}
      </div>
      <div className={classesCss.BookContent}>
        {wordsToRender?.length && wordsToRender[page]?.length ? (
          wordsToRender[page].map((word) => {
            return <WordCard key={word.id} cardInfo={word} />;
          })
        ) : (
          <BookDisclaimerEmpty />
        )}
      </div>
    </>
  );
}
