import React, { useState } from "react";
import BookHeader from "./BookHeader";
import classesCss from "../BookPage.module.scss";
import Pagination from "./Pagination";
import GroupMenu from "./GroupMenu";

export default function BookMenu({
  onPageChanged,
  currentPage,
  setCurrentPage,
  totalPagesCount,
  isLogged,
  successCounter,
  failCounter,
  totalCounter,
  settingsOn,
  groupPath,
  gameState,
}) {

  return (
    <div className={classesCss.BookMenu}>

      <BookHeader
        settingsOn={settingsOn}
        groupPath={groupPath}
        gameState={gameState}
        isLogged={isLogged}
      />


      <Pagination
        onPageChanged={onPageChanged}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPagesCount={totalPagesCount}
      />


      {isLogged && (
        <div>
          <div>Изучаемых слов: {totalCounter}</div>
          <div>
            Успешно: {successCounter}/{successCounter + failCounter}
          </div>
        </div>
      )}

      <GroupMenu groupPath={groupPath} />
    </div>
  );
}
