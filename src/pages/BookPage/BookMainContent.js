import React, { useEffect } from "react";
import { useWords } from "../../hooks/hooks.words";
import classesCss from "./../styles/BookPage.module.scss";
import WordCard from "../../components/WordCard/WordCard.js";
import { useParams } from "react-router";
import { useUserWords } from "../../hooks/hooks.user";

export default function BookMainContent({ setGroupPath, currentPage }) {
  const { currentWords, getWordsChunk, onLoading } = useWords();
  const {
    currentUserWords,
    getUserWordsChunk,
    subscribedUserWords,
    onLoading: onUserLoading,
  } = useUserWords();
  const { currentGroup } = useParams();

  useEffect(() => {
    setGroupPath("");
  }, []);

  useEffect(() => {
    const filters = {
      difficulty: "hard | normal | weak" | undefined,
      deleted: true | false | undefined,
    };
    getWordsChunk(currentGroup - 1, currentPage);
    sessionStorage.setItem("currentPage", currentPage);
    getUserWordsChunk(currentGroup - 1, currentPage, filters);
    console.log(currentUserWords);
  }, [currentPage, getWordsChunk, currentGroup, getUserWordsChunk]);

  return (
    <div>
      {currentWords &&
        currentWords.map((word) => {
          let currentWordInfo = word;
          if (currentUserWords) {
            const indexOfUserWord = currentUserWords.indexOf(word);
            if (indexOfUserWord !== -1) {
              currentWordInfo = currentUserWords[indexOfUserWord];
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
