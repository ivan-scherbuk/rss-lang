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
    setEditMode(false);
  };

  const turnToStart = () => {
    setCurrentPage(0);
  };

  const turnToEnd = () => {
    setCurrentPage(totalPagesCount - 1);
  };
  return (
    <div className={classesCss.pagination}>
      <div onClick={turnToStart}>-</div>
      Page:{" "}
      {!editMode && (
        <span onClick={activateEditMode}>
          {typeof currentPage === "number" ? currentPage + 1 : ""}
        </span>
      )}
      {editMode && (
        <input
          value={typeof currentPage === "number" ? currentPage + 1 : ""}
          onChange={onPageChanged}
          autoFocus={true}
          onBlur={deactivateEditMode}
        ></input>
      )}{" "}
      of {totalPagesCount}
      <div onClick={turnToEnd}>+</div>
    </div>
  );
}
