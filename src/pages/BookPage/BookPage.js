import React, { useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom"
import BookMainContent from "./BookMainContent";
import BookMenu from "./Menu/BookMenu";
import BookSettings from "./BookSettings";
import classesCss from "./BookPage.module.scss";
import { useDispatch } from "react-redux";
import { setBookMode } from "../../redux/actions.book";
import Vocabulary from "./Vocabulary/Vocabulary";

export default function BookPage(){

  const [isSettingsVisible, setSettingsVisible] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const [, urlMode] = location.pathname.match(/(book|vocabulary)/)
    dispatch(setBookMode(urlMode))
  }, [location.pathname, dispatch])


  return (
    <div className={classesCss.BookPage}>
      <Route path={"/book/:group/:page"}><BookMainContent/></Route>
      {/*<Route path={"/vocabulary/:group/:page"}><Vocabulary/></Route>*/}
      <BookMenu
        settingsOn = {() => setSettingsVisible(true)}
      />
      {
        isSettingsVisible ?
        <BookSettings settingsOff={() => setSettingsVisible(false)}/>
        : null
      }
    </div>

  );
}


// <Route
//   path={
//     "/book/vocabulary/:currentSectionVocabulary/group/:currentGroupVocabulary"
//   }
//   render={() => (
//     <Vocabulary
//       setGroupPath={setGroupPath}
//       totalPagesCount={totalPagesCount}
//       currentPageIndex={currentPageIndex}
//       setGameState={setGameState}
//       translate={translate}
//       isLogged={isLogged}
//     />
//   )}
// />