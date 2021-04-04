import React, { useEffect, useState } from "react";
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
  groupPath,
  isLogged,
  settingsOn,
  gameState,
}) {
  const [successCounter, setSuccessCounter] = useState(0);
  const [failCounter, setFailCounter] = useState(0);
  const [totalCounter, setTotalCounter] = useState(0);
  const [pages, setPages] = useState(
    localStorage.getItem("pages") && JSON.parse(localStorage.getItem("pages"))
  );
  const [translate, setTranslate] = useState(
    sessionStorage.getItem("translateSettings") || "y"
  );
  const [buttons, setButtons] = useState(
    sessionStorage.getItem("buttonsChange") || "y"
  );
  const [totalPagesCount, setTotalPagesCount] = useState(
    (pages && pages.length) || 30
  );
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
  useEffect(() => {
    if (!pages) {
      let helpArr = [];
      for (let i = 0; i < totalPagesCount; i++) {
        helpArr.push(i);
      }
      setPages(helpArr);
      localStorage.setItem("pages", JSON.stringify(helpArr));
      console.log(pages);
    }
  }, []);
  return (
    <>
      <div className={classesCss.BookMainContent}>
        <BookNavbar groupPath={groupPath} />
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
              isLogged={isLogged}
              pages={pages}
              setPages={setPages}
              setCurrentPage={setCurrentPage}
              setSuccessCounter={setSuccessCounter}
              setFailCounter={setFailCounter}
              setTotalCounter={setTotalCounter}
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
              isLogged={isLogged}
            />
          )}
        />
      </div>
      <Pagination
        onPageChanged={onPageChanged}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPagesCount={totalPagesCount}
        pages={pages}
        isLogged={isLogged}
        successCounter={successCounter}
        failCounter={failCounter}
        totalCounter={totalCounter}
        settingsOn={settingsOn}
        groupPath={groupPath}
        gameState={gameState}
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
    </>
  );
}
