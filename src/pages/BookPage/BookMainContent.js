import React, { useEffect } from "react";
import { useWords } from "../../hooks/hooks.words";
import WordCard from "../../components/WordCard/WordCard.js";
import { useParams } from "react-router";
import { useUserWords } from "../../hooks/hooks.user";
import { useSelector } from "react-redux";

export default function BookMainContent({
  setGroupPath,
  currentPage,
  setGameState,
}) {
  const { currentWords, getWordsChunk, onLoading } = useWords();
  const {
    currentUserWords,
    getUserWordsChunk,
    subscribedUserWords,
    onLoading: onUserLoading,
  } = useUserWords();
  const { currentGroup } = useParams();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setGroupPath("");
  }, []);

  useEffect(() => {
    getWordsChunk(currentGroup - 1, currentPage);
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    const filters = {
      difficulty: "hard | normal | weak" | undefined,
      deleted: true | false | undefined,
    };
    if (user.words) {
      getUserWordsChunk(currentGroup - 1, currentPage, filters);
      let gameStateObj = { group: currentGroup - 1, page: currentPage };
      sessionStorage.setItem("gameState", JSON.stringify(gameStateObj));
      setGameState(gameStateObj);
    }
  }, [user, currentPage]);

  return (
    <div>
      {currentWords &&
        currentWords.map((word) => {
          let currentWordInfo = word;
          if (currentUserWords) {
            for (let i = 0; i < currentUserWords.length; i++) {
              if (currentUserWords[i].id === word.id) {
                currentWordInfo = currentUserWords[i];
              }
            }
          }
          return (
            <div key={word.id}>
              <WordCard cardInfo={currentWordInfo} />
            </div>
          );
        })}
    </div>
  );
}
