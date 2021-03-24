import React, { useState } from "react";
import BookHeader from "./BookHeader.js";
import BookMainContent from "./BookMainContent.js";
import BookNavbar from "./BookNavbar.js";
import classesCss from "./../styles/BookPage.module.scss";
import { Route } from "react-router";

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
