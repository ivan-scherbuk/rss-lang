import React from "react";
import BookHeader from "./BookHeader.js";
import BookMainContent from "./BookMainContent.js";
import classesCss from "./../styles/BookPage.module.scss";
import { Route } from "react-router";
import BookNavbar from "./BookNavbar.js";

export default function BookPage() {
  return (
    <div className={classesCss.BookPage}>
      <BookHeader />
      <BookNavbar />
      <div className={classesCss.BookMainContent}>
        <Route
          path={"/book/group/:currentGroup"}
          render={() => <BookMainContent />}
        />
      </div>
    </div>
  );
}
