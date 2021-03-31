import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import moment from "moment";
import NavigationBar from "./components/Navigation/NavigationBar";
import MainPage from "./pages/MainPage";
import BookPage from "./pages/BookPage/BookPage";
import GamesPage from "./pages/GamesPage";
import Sprint from "./pages/Games/Sprint";
import AudioCall from "./pages/Games/AudioCall/AudioCall";
import Savannah from "./pages/Games/Savannah/Savannah";
import StatisticPage from "./pages/StatisticPage";
import PuzzleGame from "./pages/Games/PuzzleGame/PuzzleGame";
import "./styles/effect.scss";
import "./styles/App.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUserWords } from "./redux/actions.user";
import { syncUserWords } from "./redux/actions.words";
import { checkToken, logOut } from "./redux/actions.auth";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const words = useSelector((store) => store.words);

  async function syncUser() {
    // if token OK or token pre-expire and can be refreshed - return token
    // if token is expired - return false
    const token = await dispatch(checkToken());
    if (token) {
      await dispatch(getUserWords());
      await dispatch(syncUserWords());
    } else {
      await dispatch(logOut());
    }
  }

  useEffect(() => {
    if (user.isLogged) {
      syncUser();
    }
  }, [dispatch, user.isLogged]);

  return (
    <div>
      <NavigationBar />
      <TransitionGroup>
        <CSSTransition
          timeout={800}
          classNames="transit"
          key={location.key || location.pathname}
        >
          <Switch location={location}>
            <Route path="/book">
              <BookPage />
            </Route>
            <Route path="/statistic">
              <StatisticPage />
            </Route>
            <Route path="/games/savannah" exact component={Savannah} />
            <Route path="/games/audiocall">
              <AudioCall />
            </Route>
            <Route path="/games/sprint">
              <Sprint />
            </Route>
            <Route path="/games/puzzle">
              <PuzzleGame />
            </Route>
            <Route path="/games" exact>
              <GamesPage />
            </Route>
            <Route path="/" exact>
              <MainPage />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
