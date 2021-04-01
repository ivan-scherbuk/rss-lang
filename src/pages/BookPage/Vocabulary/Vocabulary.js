import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import WordCard from "../../../components/WordCard/WordCard";
import { useUserWordsGroup } from "../../../hooks/hooks.user";
import classesCss from "./../../styles/BookPage.module.scss";

export default function Vocabulary({
  setGroupPath,
  setTotalPagesCount,
  currentPage,
  setCurrentPage,
  totalPagesCount,
}) {
  const {
    getUserWordsGroup,
    subscribedUserWordsGroup,
    onLoading,
    currentUserWordsGroup,
  } = useUserWordsGroup();
  const { currentGroupVocabulary } = useParams();
  const { currentSectionVocabulary } = useParams();
  const user = useSelector((state) => state.user);
  const [currentSectionWords, setCurrentSectionWords] = useState();

  useEffect(() => {
    setGroupPath("vocabulary/" + currentSectionVocabulary + "/");
  }, []);

  useEffect(() => {
    const filters = {
      difficulty: "hard | normal | weak" | undefined,
      deleted: true | false | undefined,
    };
    if (user.words) {
      getUserWordsGroup(currentGroupVocabulary - 1, filters);
    }
  }, [user, currentGroupVocabulary]);

  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (currentUserWordsGroup) {
      if (currentSectionWords) {
        if (!Array.isArray(currentSectionWords[0])) {
          const maxWordsInPage = 20;
          let pages = Math.ceil(currentSectionWords.length / maxWordsInPage);
          setTotalPagesCount(pages);
          let helpArr = [];
          for (let i = 0; i < pages; i++) {
            helpArr.push(
              currentSectionWords.slice(
                i * maxWordsInPage,
                maxWordsInPage * (i + 1)
              )
            );
          }
          setCurrentSectionWords(helpArr);
        }
      } else {
        setCurrentSectionWords(
          Object.values(currentUserWordsGroup)
            .flat()
            .filter((word) => {
              if (currentSectionVocabulary === "learn") {
                return word.difficulty === "hard";
              }
              if (currentSectionVocabulary === "difficult") {
                return word.difficulty === "hard";
              }
              if (currentSectionVocabulary === "delete") {
                return word.optional.deleted;
              }
            })
        );
      }
    }
  }, [currentUserWordsGroup, currentSectionWords]);

  return (
    <div>
      <div className={classesCss.VocabularyHeader}>
        <NavLink
          className={classesCss.VocabularySection}
          to={"/book/vocabulary/learn/group/" + currentGroupVocabulary}
        >
          Изучаемые
        </NavLink>
        <NavLink
          className={classesCss.VocabularySection}
          to={"/book/vocabulary/difficult/group/" + currentGroupVocabulary}
        >
          Сложные
        </NavLink>
        <NavLink
          className={classesCss.VocabularySection}
          to={"/book/vocabulary/delete/group/" + currentGroupVocabulary}
        >
          Удаленные
        </NavLink>
      </div>
      <div>
        {Array.isArray(currentSectionWords) &&
          Array.isArray(currentSectionWords[0]) &&
          currentSectionWords[currentPage].map((word) => {
            console.log(currentSectionWords);
            console.log(word);
            return (
              <div key={word.id}>
                <WordCard cardInfo={word} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
