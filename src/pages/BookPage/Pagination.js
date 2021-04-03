import React, { useState } from "react";
import classesCss from "./BookPage.module.scss";

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
      <div
        onClick={turnToStart}
        className={[classesCss.doubleArrow, classesCss.arrow].join(" ")}
      >
        {"<<"}
      </div>
      <div
        onClick={turnPageBack}
        className={[classesCss.singleArrow, classesCss.arrow].join(" ")}
      >
        {"<"}
      </div>
      {!editMode && (
        <span onClick={activateEditMode}>
          {typeof currentPage === "number" ? currentPage + 1 : ""} /{" "}
          {totalPagesCount}
        </span>
      )}
      {editMode && (
        <input
          className={classesCss.selectedInput}
          value={typeof currentPage === "number" ? currentPage + 1 : ""}
          onChange={onPageChanged}
          autoFocus={true}
          onBlur={deactivateEditMode}
        />
      )}
      <div
        onClick={turnPageForward}
        className={[classesCss.singleArrow, classesCss.arrow].join(" ")}
      >
        {">"}
      </div>
      <div
        onClick={turnToEnd}
        className={[classesCss.doubleArrow, classesCss.arrow].join(" ")}
      >
        {">>"}
      </div>
    </div>
  );
}
