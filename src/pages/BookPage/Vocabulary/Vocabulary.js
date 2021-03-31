import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import WordCard from "../../../components/WordCard/WordCard";
import { useUserWordsGroup } from "../../../hooks/hooks.user";

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
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setGroupPath("vocabulary/");
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
      {currentUserWordsGroup &&
        Object.values(currentUserWordsGroup)
          .flat()
          .map((word) => {
            return (
              <div key={word.id}>
                <WordCard cardInfo={word} />
              </div>
            );
          })}
    </div>
  );
}
