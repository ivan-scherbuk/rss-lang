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
    if (currentUserWordsGroup) {
      console.log(Object.values(currentUserWordsGroup).flat());
    }
  }, [currentUserWordsGroup]);

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
        <Route
          path={"/book/vocabulary/delete/group/:currentGroupVocabulary"}
          render={() => (
            <div>
              {currentUserWordsGroup &&
                Object.values(currentUserWordsGroup)
                  .flat()
                  .map((word) => {
                    if (word.optional.deleted) {
                      return (
                        <div key={word.id}>
                          <WordCard cardInfo={word} />
                        </div>
                      );
                    }
                  })}
            </div>
          )}
        />
      </div>
    </div>
  );
}
