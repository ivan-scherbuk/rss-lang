import React, { useState } from "react";
import classesCss from "./../styles/BookPage.module.scss";

export default function Pagination({
  onPageChanged,
  currentPage,
  setCurrentPage,
  totalPagesCount,
}) {
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
  return (
    <div className={classesCss.pagination}>
      <div onClick={turnToStart} className={classesCss.doubleArrow}>
        {"<<"}
      </div>
      <div onClick={turnPageBack} className={classesCss.singleArrow}>
        {"<"}
      </div>
      Page:
      {!editMode && (
        <span onClick={activateEditMode}>
          {typeof currentPage === "number" ? currentPage + 1 : ""}
        </span>
      )}
      {editMode && (
        <input
          className={classesCss.selectedInput}
          value={typeof currentPage === "number" ? currentPage + 1 : ""}
          onChange={onPageChanged}
          autoFocus={true}
          onBlur={deactivateEditMode}
        ></input>
      )}
      of {totalPagesCount}
      <div onClick={turnPageForward} className={classesCss.singleArrow}>
        {">"}
      </div>
      <div onClick={turnToEnd} className={classesCss.doubleArrow}>
        {">>"}
      </div>
    </div>
  );
}
