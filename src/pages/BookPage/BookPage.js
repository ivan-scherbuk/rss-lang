import React, { useState } from "react";
import BookHeader from "./BookHeader.js";
import BookMainContent from "./BookMainContent.js";
import classesCss from "./../styles/BookPage.module.scss";
import { Route } from "react-router";
import BookNavbar from "./BookNavbar.js";
import Vocabulary from "./Vocabulary/Vocabulary.js";

export default function BookPage() {
  const [isBook, setIsBook] = useState(true);
  const [settingsToggle, setSettingsToggle] = useState(false);

  const settingsOff = () => {
    setSettingsToggle(false);
  };

  const settingsOn = () => {
    setSettingsToggle(true);
  };
  return (
    <div className={classesCss.BookPage}>
      <BookHeader settingsOn={settingsOn} />
      <div className={classesCss.main}>
        {isBook && <BookNavbar />}
        <div className={classesCss.BookMainContent}>
          <Route
            path={"/book/group/:currentGroup"}
            render={() => (
              <BookMainContent
                setIsBook={setIsBook}
                settingsToggle={settingsToggle}
                settingsOff={settingsOff}
              />
            )}
          />
          <Route
            path={"/book/vocabulary"}
            render={() => <Vocabulary setIsBook={setIsBook} />}
          />
        </div>
      </div>
    </div>
  );
}
