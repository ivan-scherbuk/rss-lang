import React, { useState } from "react";
import classesCss from "../BookPage.module.scss";
import { setCurrentPage } from "../../../redux/actions.book";
import { useDispatch } from "react-redux";

export default function PaginationInput({ totalPagesCount, currentPageIndex }) {
  let [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    if (currentPageIndex === "") {
      dispatch(setCurrentPage(0));
    }
    setEditMode(false);
  };

  const onPageChanged = (e) => {
    if (e.target.value > 0 && e.target.value <= totalPagesCount) {
      dispatch(setCurrentPage(e.target.value - 1));
    } else if (e.target.value === "") {
      dispatch(setCurrentPage(e.target.value));
    }
  };

  return (
    <div className={classesCss.PageCounter}>
      {!editMode && (
        <span onClick={activateEditMode}>
          {typeof currentPageIndex === "number" ? currentPageIndex + 1 : ""} /{" "}
          {totalPagesCount}
        </span>
      )}
      {editMode && (
        <input
          className={classesCss.SelectedInput}
          value={
            typeof currentPageIndex === "number" ? currentPageIndex + 1 : ""
          }
          onChange={onPageChanged}
          autoFocus={true}
          onBlur={deactivateEditMode}
        />
      )}
    </div>
  );
}
