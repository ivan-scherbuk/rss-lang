import React, { useState } from "react";
import BookMainContent from "./BookMainContent.js";
import classesCss from "./BookPage.module.scss";
import { Route } from "react-router";
import Vocabulary from "./Vocabulary/Vocabulary.js";
import SettingsBook from "./SettingsBook.js";
import Pagination from "./Pagination.js";
import BookNavbar from "./BookNavbar";

export default function BookMain({
  setGroupPath,
  settingsToggle,
  settingsOff,
  setGameState,
  groupPath
}) {
  const [translate, setTranslate] = useState(
    sessionStorage.getItem("translateSettings") || "y"
  );
  const [buttons, setButtons] = useState(
    sessionStorage.getItem("buttonsChange") || "y"
  );
  const [totalPagesCount, setTotalPagesCount] = useState(30);
  const [currentPage, setCurrentPage] = useState(
    +sessionStorage.getItem("currentPage")
  );
  const onPageChanged = (e) => {
    if (e.target.value > 0 && e.target.value <= totalPagesCount) {
      setCurrentPage(e.target.value - 1);
    } else if (e.target.value === "") {
      setCurrentPage(e.target.value);
    }
  };
  return (
    <>
    <div className={classesCss.BookMainContent}>
      <BookNavbar groupPath={groupPath}/>
      <Route
        path={"/book/group/:currentGroup"}
        render={() => (
          <BookMainContent
            setGroupPath={setGroupPath}
            settingsToggle={settingsToggle}
            settingsOff={settingsOff}
            currentPage={currentPage}
            setGameState={setGameState}
            setTotalPagesCount={setTotalPagesCount}
            totalPagesCount={totalPagesCount}
            buttons={buttons}
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
            totalPagesCount={totalPagesCount}
            setTotalPagesCount={setTotalPagesCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setGameState={setGameState}
            translate={translate}
          />
        )}
      />

      {settingsToggle && (
        <SettingsBook
          settingsOff={settingsOff}
          translate={translate}
          setTranslate={setTranslate}
          buttons={buttons}
          setButtons={setButtons}
        />
      )}
    </div>
      <Pagination
        onPageChanged={onPageChanged}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPagesCount={totalPagesCount}
      />
    </>
  );
}
