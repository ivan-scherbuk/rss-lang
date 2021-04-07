import React, { useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom";
import BookMainContent from "./BookMainContent";
import BookMenu from "./Menu/BookMenu";
import BookSettings from "./BookSettings";
import classesCss from "./BookPage.module.scss";
import { useDispatch } from "react-redux";
import { setBookMode } from "../../redux/actions.book";
import Vocabulary from "./Vocabulary/Vocabulary";
import { MODE_BOOK, MODE_VOCABULARY } from "../../settings";

export default function BookPage() {
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [totalPagesCount, setTotalPagesCount] = useState();
  const [totalValues, setTotalValues] = useState({
    success: 0,
    fail: 0,
    learned: 0
  })
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const [, urlMode] = location.pathname.match(new RegExp(`(${MODE_BOOK}|${MODE_VOCABULARY})`));
    dispatch(setBookMode(urlMode));
  }, [location.pathname, dispatch]);

  return (
    <div className={classesCss.BookPage}>
      <Route path={`/${MODE_BOOK}/:group/:page`}>
        <BookMainContent setTotalValues={setTotalValues}/>
      </Route>
      <Route path={`/${MODE_VOCABULARY}/:sectionVocabulary/:group/:page`}>
        <Vocabulary setTotalPagesCount={setTotalPagesCount}/>
      </Route>
      <BookMenu
        totalPagesCount={totalPagesCount}
        setTotalPagesCount={setTotalPagesCount}
        totalValues={totalValues}
        settingsOn={() => setSettingsVisible(true)}
      />
      {isSettingsVisible ? (
        <BookSettings settingsOff={() => setSettingsVisible(false)} />
      ) : null}
    </div>
  );
}