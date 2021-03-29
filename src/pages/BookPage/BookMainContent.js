import React, { useEffect, useState } from "react";
import { useWords } from "../../hooks/hooks.words";
import classesCss from "./../styles/BookPage.module.scss";
import WordCard from "../../components/WordCard/WordCard.js";
import { useParams } from "react-router";
import Pagination from "./Pagination";

export default function BookMainContent({ setIsBook }) {
  const [totalPagesCount, setTotalPagesCount] = useState(30);
  const [currentPage, setCurrentPage] = useState(
    +sessionStorage.getItem("currentPage") || 0
  );
  const { currentWords, getWordsChunk, onLoading } = useWords();
  const { currentGroup } = useParams();

  useEffect(() => {
    setIsBook(true);
  }, []);
  const onPageChanged = (e) => {
    if (e.target.value > 0 && e.target.value <= totalPagesCount) {
      setCurrentPage(e.target.value - 1);
    } else if (e.target.value === "") {
      setCurrentPage(e.target.value);
    }
  };

  useEffect(() => {
    getWordsChunk(currentGroup - 1, currentPage);
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage, getWordsChunk, currentGroup]);

  return (
    <div>
      <div className={classesCss.test}>
        {currentWords &&
          currentWords.map((word) => {
            return (
              <div key={word.id}>
                <WordCard cardInfo={word} />
              </div>
            );
          })}
      </div>
      <Pagination
        onPageChanged={onPageChanged}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPagesCount={totalPagesCount}
      />
    </div>
  );
}
