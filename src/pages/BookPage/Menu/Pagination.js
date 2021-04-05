import React, { useState } from "react"
import classesCss from "../BookPage.module.scss";
import Button from "../../../components/Buttons/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'


export default function Pagination({onPageChanged, currentPage, setCurrentPage, totalPagesCount,}){

  let [editMode, setEditMode] = useState(false);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    if (currentPage === "") {
      setCurrentPage(0);
    }
    setEditMode(false);
  };

  const turnPageBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const turnPageForward = () => {
    if (currentPage < totalPagesCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const turnToStart = () => {
    setCurrentPage(0);
  };

  const turnToEnd = () => {
    setCurrentPage(totalPagesCount - 1);
  };

  return(
    <div className={classesCss.Pagination}>
      <Button
        onClick={turnToStart}
        className={classesCss.PaginationButton}
        label={<FontAwesomeIcon icon={faAngleDoubleLeft}/>}
      />
      <Button
        onClick={turnPageBack}
        className={classesCss.PaginationButton}
        label={<FontAwesomeIcon icon={faAngleLeft}/>}
      />
      <div className={classesCss.PageCounter}>
      {!editMode && (
        <span onClick={activateEditMode}>
          {typeof currentPage === "number" ? currentPage + 1 : ""} /{" "}
          {totalPagesCount}
        </span>
      )}
      {editMode && (
        <input
          className={classesCss.SelectedInput}
          value={typeof currentPage === "number" ? currentPage + 1 : ""}
          onChange={onPageChanged}
          autoFocus={true}
          onBlur={deactivateEditMode}
        />
      )}
      </div>
      <Button
        onClick={turnPageForward}
        className={classesCss.PaginationButton}
        label={<FontAwesomeIcon icon={faAngleRight}/>}
      />
      <Button
        onClick={turnToEnd}
        className={classesCss.PaginationButton}
        label={<FontAwesomeIcon icon={faAngleDoubleRight}/>}
      />
    </div>
  )
}