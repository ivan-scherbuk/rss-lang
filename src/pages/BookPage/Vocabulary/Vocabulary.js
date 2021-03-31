import React, { useEffect } from "react";
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

  useEffect(() => {
    setGroupPath("vocabulary/");
  }, []);

  useEffect(() => {
    const filters = {
      difficulty: "hard | normal | weak" | undefined,
      deleted: true | false | undefined,
    };
    getUserWordsGroup(currentGroupVocabulary - 1, filters);
    console.log(currentUserWordsGroup);
  }, [currentGroupVocabulary]);

  return (
    <div>
      {currentUserWordsGroup &&
        currentUserWordsGroup.map((word) => {
          return (
            <div key={word.id}>
              <WordCard cardInfo={word} />
            </div>
          );
        })}
    </div>
  );
}
