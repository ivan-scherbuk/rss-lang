import React from "react"
import classesCss from "../BookPage.module.scss";
import Button from "../../../components/Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PaginationInput from "./PagintaionInput";


export default function Pagination(){

  const {currentPageIndex, pagesList, currentGroup} = useSelector(store => store.book)
  const currentPageList = pagesList[currentGroup]
  const totalPagesCount = currentPageList.length

  function getNextPage(direction){
    if (currentPageIndex + direction >= 0 && currentPageIndex + direction < totalPagesCount) {
      return currentPageList[currentPageIndex + direction] + 1
    }
    return currentPageList[currentPageIndex] + 1
  }

  return (
    <div className={classesCss.Pagination}>

      <Link to={`/book/${currentGroup + 1}/${currentPageList[0] + 1}`}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={faAngleDoubleLeft}/>}
        />
      </Link>

      <Link to={`/book/${currentGroup + 1}/${getNextPage(-1)}`}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={faAngleLeft}/>}
        />
      </Link>

      <PaginationInput totalPagesCount = {totalPagesCount} currentPageIndex={currentPageIndex}/>

      <Link to={`/book/${currentGroup + 1}/${getNextPage(1)}`}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={faAngleRight}/>}
        />
      </Link>

      <Link to={`/book/${currentGroup + 1}/${currentPageList[currentPageList.length - 1] + 1}`}>
        <Button
          className={classesCss.PaginationButton}
          label={<FontAwesomeIcon icon={faAngleDoubleRight}/>}
        />
      </Link>
    </div>
  )
}