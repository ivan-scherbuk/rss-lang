import React, { useEffect } from "react";
import classesCss from "../BookPage.module.scss";
import Button from "../../../components/Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PaginationInput from "./PagintaionInput";
import { MODE_BOOK, MODE_VOCABULARY } from "../../../settings";

export default function Pagination({totalPagesCount, setTotalPagesCount}) {

  const { currentPageIndex, pagesList, currentGroup, mode } = useSelector(
    (store) => store.book
  );
  const currentPageList = pagesList[currentGroup];

  function getNextPage(direction) {
    if (
      currentPageIndex + direction >= 0 &&
      currentPageIndex + direction < totalPagesCount
    ) {
      return currentPageList[currentPageIndex + direction] + 1;
    }
    return currentPageList[currentPageIndex] + 1;
  }

  useEffect(() => {
    if (mode === MODE_BOOK) {
      setTotalPagesCount(currentPageList.length);
    }
  }, [mode, setTotalPagesCount, currentPageList.length]);

  const pathBase = `/${mode}/${currentGroup + 1}/`


  console.log(currentPageIndex)
  return (
    <div className={classesCss.Pagination}>
      <Link to={pathBase + (currentPageList[0] + 1)}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
        />
      </Link>

      <Link to={pathBase + (getNextPage(-1))}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={faAngleLeft} />}
        />
      </Link>

      <PaginationInput
        totalPagesCount={mode === MODE_VOCABULARY? totalPagesCount : pagesList[currentGroup].length}
        currentPageIndex={currentPageIndex}
      />

      <Link to={pathBase + (getNextPage(1))}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={faAngleRight} />}
        />
      </Link>

      <Link to={pathBase + totalPagesCount}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={faAngleDoubleRight} />}
        />
      </Link>
    </div>
  );
}
