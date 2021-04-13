import React, { useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom";
import BookContent from "./BookContent";
import BookMenu from "./Menu/BookMenu";
import BookSettings from "./BookSettings";
import classesCss from "./BookPage.module.scss";
import { useDispatch } from "react-redux";
import { setBookMode } from "../../redux/actions.book";
import VocabularyContent from "./VocabularyContent";
import { MODE_BOOK, MODE_VOCABULARY } from "../../settings";
import cx from "classnames";
import levelStyles from "../../styles/LevelStyles.module.scss";

export default function BookPage() {
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [totalPagesCount, setTotalPagesCount] = useState();
  const [levelStyle, setLevelStyle] = useState(0);
  const [totalValues, setTotalValues] = useState({
    success: 0,
    fail: 0,
    learned: 0,
  });
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const [, urlMode] = location.pathname.match(
      new RegExp(`(${MODE_BOOK}|${MODE_VOCABULARY})`)
    );
    dispatch(setBookMode(urlMode));
  }, [location.pathname, dispatch]);

  return (
    <div
      className={cx(classesCss.BookPage, levelStyles[`Level${levelStyle + 1}`])}
    >
      <Route path={`/${MODE_BOOK}/:group/:page`}>
        <BookContent
          setTotalPagesCount={setTotalPagesCount}
          setTotalValues={setTotalValues}
          setLevelStyle={setLevelStyle}
        />
      </Route>
      <Route path={`/${MODE_VOCABULARY}/:group/:page`}>
        <VocabularyContent
          setTotalPagesCount={setTotalPagesCount}
          setLevelStyle={setLevelStyle}
          setTotalValues={setTotalValues}
        />
      </Route>
      <BookMenu
        totalPagesCount={totalPagesCount}
        totalValues={totalValues}
        settingsOn={() => setSettingsVisible(true)}
      />
      {isSettingsVisible ? (
        <BookSettings settingsOff={() => setSettingsVisible(false)} />
      ) : null}
    </div>
  );
}
