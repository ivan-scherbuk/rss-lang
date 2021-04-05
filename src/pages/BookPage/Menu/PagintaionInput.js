import React, { useState } from "react"
import classesCss from "../BookPage.module.scss";
import { setCurrentPage } from "../../../redux/actions.book";

export default function PaginationInput({totalPagesCount, currentPageIndex}){

  let [editMode, setEditMode] = useState(false);
  const activateEditMode = () => {
    setEditMode(true);
  };
  // const deactivateEditMode = () => {
  //   if (currentPageIndex === "") {
  //     dispatch(setCurrentPage(0))
  //   }
  //   setEditMode(false);
  // };

  return(
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
          value={typeof currentPageIndex === "number" ? currentPageIndex + 1 : ""}
          //onChange={onPageChanged}
          //autoFocus={true}
          //onBlur={deactivateEditMode}
        />
      )}
    </div>
  )
}