import React, { useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import { setBookMode } from "../../redux/actions.book";
import BookContent from "./BookContent";
import BookMenu from "./Menu/BookMenu";
import BookSettings from "./BookSettings";
import VocabularyContent from "./VocabularyContent";
import { MODE_DETECT_PATTERN, MODE_BOOK, MODE_VOCABULARY } from "../../settings/settings";
import classesCss from "./BookPage.module.scss";
import levelStyles from "../../styles/LevelStyles.module.scss";


export default function BookPage() {
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [totalPagesCount, setTotalPagesCount] = useState();
  const [totalValues, setTotalValues] = useState({
    success: 0,
    fail: 0,
    learned: 0
  })
  const {pathname} = useLocation();
  const {currentGroup} = useSelector(({book}) => book)
  const dispatch = useDispatch();

  useEffect(() => {
    const [, urlMode] = pathname.match(MODE_DETECT_PATTERN);
    dispatch(setBookMode(urlMode));
  }, [pathname, dispatch]);

  return (
    <div className={cx(
      classesCss.BookPage,
      levelStyles[`Level${currentGroup+1}`]
    )}>
      <Route path={`/${MODE_BOOK}/:group/:page`}>
        <BookContent
          setTotalPagesCount={setTotalPagesCount}
          setTotalValues={setTotalValues}
        />
      </Route>
      <Route path={`/${MODE_VOCABULARY}/:group/:page`}>
        <VocabularyContent setTotalPagesCount={setTotalPagesCount}/>
      </Route>
      <BookMenu
        totalPagesCount={totalPagesCount}
        totalValues={totalValues}
        settingsOn={() => setSettingsVisible(true)}
      />
      {isSettingsVisible ? (<BookSettings settingsOff={() => setSettingsVisible(false)} />) : null}
    </div>
  );
}