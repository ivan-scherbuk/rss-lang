import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import WordCard from "../../../components/WordCard/WordCard";
import { checkGroup, checkPage } from "../../../helpers/utils.checkers";
import { useUserWordsGroup } from "../../../hooks/hooks.user";
import { setCurrentGroup, setCurrentPage } from "../../../redux/actions.book";
import classesCss from "../BookPage.module.scss";

export default function Vocabulary({ setGroupPath, setTotalPagesCount }) {
  const {
    getUserWordsGroup,
    onLoading,
    currentUserWordsGroup,
  } = useUserWordsGroup();
  const [wordsToRender, setWordsToRender] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    sectionVocabulary: urlSection,
    group: urlGroup,
    page: urlPage = 1,
  } = useParams();
  const group = checkGroup(urlGroup - 1);
  const page = checkPage(urlPage - 1);

  useEffect(() => {
    setGroupPath("vocabulary/" + urlSection + "/");
  }, [urlSection]);

  useEffect(() => {
    const filters = {
      difficulty: "hard | normal | weak" | undefined,
      deleted: true | false | undefined,
    };
    if (user.words) {
      getUserWordsGroup(group, filters);
    }
  }, [user, group, urlSection]);

  useEffect(() => {
    if (currentUserWordsGroup) {
      setWordsToRender(
        Object.values(currentUserWordsGroup)
          .flat()
          .filter((word) => {
            if (urlSection === "learn") {
              return (
                word.difficulty === "hard" ||
                word.optional.failCounter > 0 ||
                word.optional.successCounter > 0
              );
            }
            if (urlSection === "difficult") {
              return word.difficulty === "hard";
            }
            if (urlSection === "delete") {
              return word.optional.deleted;
            }
          })
      );
    }
  }, [currentUserWordsGroup]);

  useEffect(() => {
    if (wordsToRender && !Array.isArray(wordsToRender[0])) {
      const maxWordsInPage = 20;
      let pagesNumber = Math.ceil(wordsToRender.length / maxWordsInPage);
      setTotalPagesCount(pagesNumber);
      let helpArr = [];
      for (let i = 0; i < pagesNumber; i++) {
        helpArr.push(
          wordsToRender.slice(i * maxWordsInPage, maxWordsInPage * (i + 1))
        );
      }
      setWordsToRender(helpArr);
      // if (currentSectionVocabulary === "difficult") {
      //   setGameState(helpArr[currentPage]);
      //   sessionStorage.setItem(
      //     "gameState",
      //     JSON.stringify(helpArr[currentPage])
      //   );
      // }
    }
  }, [wordsToRender]);

  useEffect(() => {
    dispatch(setCurrentGroup(group));
  }, [group, dispatch]);

  useEffect(() => {
    dispatch(setCurrentPage(page));
  }, [page, dispatch]);

  return (
    <div>
      <div className={classesCss.BookContent}>
        <NavLink
          className={classesCss.VocabularySection}
          to={`/vocabulary/learn/${group + 1}/1`}
        >
          Изучаемые
        </NavLink>
        <NavLink
          className={classesCss.VocabularySection}
          to={`/vocabulary/difficult/${group + 1}/1`}
        >
          Сложные
        </NavLink>
        <NavLink
          className={classesCss.VocabularySection}
          to={`/vocabulary/delete/${group + 1}/1`}
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
                className={
                  urlSection === "learn" &&
                  word.difficulty === "hard" &&
                  classesCss.test
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
