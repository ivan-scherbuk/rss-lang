import React, { useState } from "react";
import BookHeader from "./BookHeader.js";
import BookMainContent from "./BookMainContent.js";
import classesCss from "./../styles/BookPage.module.scss";
import { Route } from "react-router";
import BookNavbar from "./BookNavbar.js";
import Vocabulary from "./Vocabulary/Vocabulary.js";
import SettingsBook from "./SettingsBook.js";

export default function BookPage() {
  const [isBook, setIsBook] = useState(true);
  return (
    <div className={classesCss.BookPage}>
      <BookHeader />
      {isBook && <BookNavbar />}
      <div className={classesCss.BookMainContent}>
        <Route
          path={"/book/group/:currentGroup"}
          render={() => <BookMainContent setIsBook={setIsBook} />}
        />
        <Route
          path={"/book/settings"}
          render={() => <SettingsBook setIsBook={setIsBook} />}
        />
        <Route
          path={"/book/vocabulary"}
          render={() => <Vocabulary setIsBook={setIsBook} />}
        />
      </div>
    </div>
  );
}
