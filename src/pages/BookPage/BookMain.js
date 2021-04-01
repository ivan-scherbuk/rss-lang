import React, { useState } from "react";
import BookMainContent from "./BookMainContent.js";
import classesCss from "./../styles/BookPage.module.scss";
import { Route } from "react-router";
import Vocabulary from "./Vocabulary/Vocabulary.js";
import SettingsBook from "./SettingsBook.js";
import Pagination from "./Pagination.js";

export default function BookMain({
  setGroupPath,
  settingsToggle,
  settingsOff,
}) {
  const [totalPagesCount, setTotalPagesCount] = useState(30);
  const [currentPage, setCurrentPage] = useState(
    +sessionStorage.getItem("currentPage") || 0
  );
  const onPageChanged = (e) => {
    if (e.target.value > 0 && e.target.value <= totalPagesCount) {
      setCurrentPage(e.target.value - 1);
    } else if (e.target.value === "") {
      setCurrentPage(e.target.value);
    }
  };
  return (
    <div className={classesCss.BookMainContent}>
      <Route
        path={"/book/group/:currentGroup"}
        render={() => (
          <BookMainContent
            setGroupPath={setGroupPath}
            settingsToggle={settingsToggle}
            settingsOff={settingsOff}
            currentPage={currentPage}
          />
        )}
      />
      <Route
        path={
          "/book/vocabulary/:currentSectionVocabulary/group/:currentGroupVocabulary"
        }
        render={() => (
          <Vocabulary
            setGroupPath={setGroupPath}
            setTotalPagesCount={setTotalPagesCount}
            currentPage={currentPage}
          />
        )}
      />
      <Pagination
        onPageChanged={onPageChanged}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPagesCount={totalPagesCount}
      />
      {settingsToggle && <SettingsBook settingsOff={settingsOff} />}
    </div>
  );
}
