import React from "react"
import { NavLink, Route } from "react-router-dom"
import NavigationBar from "./components/Navigation/NavigationBar"
import AuthBlock from "./components/Navigation/AuthBlock"
import AuthForm from "./components/AuthForm/AuthForm"
import MainPage from "./pages/MainPage"
import Button from "./components/Buttons/Button"
import BookPage from "./pages/BookPage/BookPage"
import GamesPage from "./pages/GamesPage"
import Sprint from "./pages/Games/Sprint"
import AudioCall from "./pages/Games/Audiocall"
import Savannah from "./pages/Games/Savannah"
import classesCss from "./styles/App.module.scss"
import StatisticPage from "./pages/StatisticPage"

function App() {
  const navigationClasses = [classesCss.Navigation, classesCss.NavigationCloud];

  return (
    <div>
      <Route
        exact
        path="/"
        render={() => (
          <div>
            <NavigationBar className={navigationClasses.join(" ")}>
              <AuthBlock
                className={classesCss.AuthBlock}
                classes={{
                  authButton: classesCss.BubbleButton,
                  authButtonActive: classesCss.Active,
                  loginButton: classesCss.LoginButton,
                  modal: classesCss.AuthModal,
                  modalActive: classesCss.Active,
                  avatar: classesCss.Avatar,
                }}
                styles={{
                  authButton: {
                    backgroundImage: `url(${process.env.PUBLIC_URL}/static/register2.jpg)`,
                  },
                }}
              >
                <AuthForm />
              </AuthBlock>
              <NavLink to="/statistic">
                <Button
                  label={"Статистика"}
                  style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/static/statistic.jpg)`,
                  }}
                  className={[
                    classesCss.BubbleButton,
                    classesCss.StatisticButton,
                  ].join(" ")}
                />
              </NavLink>
              <NavLink to="/book">
                <Button
                  label={"Учебник"}
                  style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/static/book.webp)`,
                  }}
                  className={[
                    classesCss.BubbleButton,
                    classesCss.BookButton,
                  ].join(" ")}
                />
              </NavLink>
              <NavLink to="/games/savannah">
              <Button
                label={"Саванна"}
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/static/savannah.jpg)`,
                }}
                className={[
                  classesCss.BubbleButton,
                  classesCss.GameButton,
                  classesCss.Savannah,
                ].join(" ")}
              />
              </NavLink>
              <NavLink to="/games/audiocall">
              <Button
                label={"Аудио-вызов"}
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/static/audio.jpg)`,
                }}
                className={[
                  classesCss.BubbleButton,
                  classesCss.GameButton,
                  classesCss.Audio,
                ].join(" ")}
              />
              </NavLink>
              <NavLink to="/games/sprint">
              <Button
                label={"Спринт"}
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/static/sprint.jpg)`,
                }}
                className={[
                  classesCss.BubbleButton,
                  classesCss.GameButton,
                  classesCss.Sprint,
                ].join(" ")}
              />
              </NavLink>
              <NavLink to="/games/game">
              <Button
                label={"Игра"}
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/static/book.webp)`,
                }}
                className={[
                  classesCss.BubbleButton,
                  classesCss.GameButton,
                  classesCss.Game,
                ].join(" ")}
              />
              </NavLink>
            </NavigationBar>
          </div>
        )}
      />
      <Route path="/" exact><MainPage /></Route>
      <Route path="/book"><BookPage /></Route>
      <Route path="/statistic"><StatisticPage /></Route>
      <Route path="/games" exact><GamesPage/></Route>
      <Route path="/games/savannah"><Savannah /></Route>
      <Route path="/games/audiocall"><AudioCall /></Route>
      <Route path="/games/sprint"><Sprint /></Route>
    </div>
  );
}

export default App;
