import React, { useEffect, useState } from "react";
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

export default function Pagination({
  groupPath,
  totalPagesCount,
  setTotalPagesCount,
}) {
  const { currentPageIndex, pagesList, currentGroup } = useSelector(
    (store) => store.book
  );
  const currentPageList = pagesList[currentGroup];

  useEffect(() => {
    if (groupPath.includes("book")) {
      setTotalPagesCount(currentPageList.length);
    }
  }, [groupPath]);

  function getNextPage(direction) {
    if (
      currentPageIndex + direction >= 0 &&
      currentPageIndex + direction < totalPagesCount
    ) {
      return currentPageList[currentPageIndex + direction] + 1;
    }
    return currentPageList[currentPageIndex] + 1;
  }

  return (
    <div className={classesCss.Pagination}>
      <Link to={`/${groupPath}${currentGroup + 1}/${currentPageList[0] + 1}`}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
        />
      </Link>

      <Link to={`/${groupPath}${currentGroup + 1}/${getNextPage(-1)}`}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={faAngleLeft} />}
        />
      </Link>

      <PaginationInput
        totalPagesCount={totalPagesCount}
        currentPageIndex={currentPageIndex}
      />

      <Link to={`/${groupPath}${currentGroup + 1}/${getNextPage(1)}`}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={faAngleRight} />}
        />
      </Link>

      <Link to={`/${groupPath}${currentGroup + 1}/${totalPagesCount}`}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={faAngleDoubleRight} />}
        />
      </Link>
    </div>
  );
}
