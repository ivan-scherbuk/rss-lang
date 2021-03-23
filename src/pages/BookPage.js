import React, { useEffect, useState } from "react";
import useWords from "./../hooks/useWords";
import classesCss from "./styles/BookPage.module.scss";

import { useDispatch, useSelector } from "react-redux";

export default function BookPage() {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [totalPagesCount, setTotalPagesCount] = useState(30);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentGroupOfPages, setCurrentGroupOfPages] = useState(1);
  const words = useSelector((state) => state.words);
  const { currentWords, getWordsChunk, onLoading } = useWords();

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
    getWordsChunk(currentGroup, currentPage);
  }, [currentPage, getWordsChunk, currentGroup]);
  return (
    <div className={classesCss.BookPage}>
      {currentWords &&
        currentWords.map((word) => {
          return <div key={word.id}>{word.word}</div>;
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
          }
        })}
        <div onClick={turnGroupOfPagesForward}>+</div>
      </div>
    </div>
  );
}
