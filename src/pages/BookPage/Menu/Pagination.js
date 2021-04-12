import React from "react";
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
import { MODE_VOCABULARY } from "../../../settings";

const paginationButtons = {
  leftEnd: faAngleDoubleLeft,
  left: faAngleLeft,
  right: faAngleRight,
  rightEnd: faAngleDoubleRight,
};

export default function Pagination({ totalPagesCount }) {
  const {
    vocabularyCurrentPage,
    currentPageIndex,
    pagesList,
    currentGroup,
    mode,
    vocabularyMode,
  } = useSelector((store) => store.book);

  const currentPageList = pagesList[currentGroup];
  const pathBase = `/${mode}/${currentGroup + 1}/`;

  function getNextPage(direction) {
    if (
      currentPageIndex + direction >= 0 &&
      currentPageIndex + direction < totalPagesCount
    ) {
      return currentPageList[currentPageIndex + direction] + 1;
    }
    return currentPageList[currentPageIndex] + 1;
  }

  function getNextVocabularyPage(direction) {
    if (
      vocabularyCurrentPage + direction >= 0 &&
      vocabularyCurrentPage + direction < totalPagesCount
    ) {
      return vocabularyCurrentPage + direction + 1;
    }
    return vocabularyCurrentPage + 1;
  }

  function getPaginationButtonsValues() {
    if (mode === MODE_VOCABULARY) {
      return {
        leftEnd: { pathname: pathBase + 1, state: { vocabularyMode } },
        left: {
          pathname: pathBase + getNextVocabularyPage(-1),
          state: { vocabularyMode },
        },
        right: {
          pathname: pathBase + getNextVocabularyPage(1),
          state: { vocabularyMode },
        },
        rightEnd: {
          pathname: pathBase + totalPagesCount,
          state: { vocabularyMode },
        },
      };
    }
    return {
      leftEnd: pathBase + (currentPageList[0] + 1),
      left: pathBase + getNextPage(-1),
      right: pathBase + getNextPage(1),
      rightEnd: pathBase + (currentPageList[currentPageList.length - 1] + 1),
    };
  }

  const paginationGoTo = getPaginationButtonsValues();

  return (
    <div className={classesCss.Pagination}>
      <Link to={paginationGoTo.leftEnd}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={paginationButtons.leftEnd} />}
        />
      </Link>

      <Link to={paginationGoTo.left}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={paginationButtons.left} />}
        />
      </Link>

      <PaginationInput
        totalPagesCount={
          mode === MODE_VOCABULARY
            ? totalPagesCount
            : pagesList[currentGroup].length
        }
        currentPageIndex={
          mode === MODE_VOCABULARY ? vocabularyCurrentPage : currentPageIndex
        }
      />

      <Link to={paginationGoTo.right}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={paginationButtons.right} />}
        />
      </Link>

      <Link to={paginationGoTo.rightEnd}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={paginationButtons.rightEnd} />}
        />
      </Link>
    </div>
  );
}
