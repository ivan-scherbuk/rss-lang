import React, { useEffect, useState } from "react";
import useWords from "../../hooks/useWords";
import classesCss from "./../styles/BookPage.module.scss";
import WordCard from "../../components/WordCard/WordCard.js";
import { useParams } from "react-router";

export default function BookMainContent() {
  const [totalPagesCount, setTotalPagesCount] = useState(30);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroupOfPages, setCurrentGroupOfPages] = useState(1);
  const { currentWords, getWordsChunk, onLoading } = useWords();
  const { currentGroup } = useParams();

  let pages = [];

  for (let i = 1; i <= totalPagesCount; i++) {
    pages.push(i);
  }

  const onPageChanged = (page) => {
    setCurrentPage(page - 1);
  };

  const turnGroupOfPagesForward = () => {
    if (currentGroupOfPages < Math.ceil(totalPagesCount / 10)) {
      setCurrentGroupOfPages(currentGroupOfPages + 1);
    }
  };

  const turnGroupOfPagesBack = () => {
    if (currentGroupOfPages > 1) {
      setCurrentGroupOfPages(currentGroupOfPages - 1);
    }
  };

  useEffect(() => {
    getWordsChunk(currentGroup - 1, currentPage);
  }, [currentPage, getWordsChunk, currentGroup]);

  return (
    <div>
      {currentWords &&
        currentWords.map((word) => {
          return (
            <div key={word.id}>
              <WordCard cardInfo={word} />
            </div>
          );
        })}
      <div className={classesCss.pagination}>
        <div onClick={turnGroupOfPagesBack}>-</div>
        {pages.map((page) => {
          if (
            page > (currentGroupOfPages - 1) * 10 &&
            page <= currentGroupOfPages * 10
          ) {
            return (
              <div onClick={() => onPageChanged(page)} key={page - 1}>
                {page}
              </div>
            );
          } else return null;
        })}
        <div onClick={turnGroupOfPagesForward}>+</div>
      </div>
    </div>
  );
}
