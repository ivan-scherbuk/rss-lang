import React, { useState } from "react";
import BookHeader from "./BookHeader.js";
import BookMainContent from "./BookMainContent.js";
import BookNavbar from "./BookNavbar.js";
import classesCss from "./../styles/BookPage.module.scss";

export default function BookPage() {
  const [currentGroup, setCurrentGroup] = useState(
    localStorage.getItem("group") || 0
  );
  return (
    <div className={classesCss.BookPage}>
      <BookHeader />
      <BookNavbar setCurrentGroup={setCurrentGroup} />
      <div className={classesCss.BookMainContent}>
        <BookMainContent currentGroup={currentGroup} />
      </div>
    </div>
  );
}
