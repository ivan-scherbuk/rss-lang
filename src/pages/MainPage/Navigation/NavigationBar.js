import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthBlock from "./AuthBlock";
import AuthForm from "./AuthForm";
import Button from "../../../components/Buttons/Button";
import classesCss from "./Navigation.module.scss";
import cx from "classnames"
import BookButton from "../../../components/Buttons/BookButton";
import { useSelector } from "react-redux";
import { GAMES_ARRAY } from "../../Games/gamesData";
import { setFirstLetterToCapital } from "../../../helpers/gameUtils";
import GameButton from "../../../components/Buttons/GameButton";


export default function NavigationBar() {
  const {isLogged} = useSelector(store => store.user)
  const location = useLocation();

  return (
    <div className={cx(
      classesCss.Navigation,
      {[classesCss.NavigationCloud] : location.pathname === "/"}
      )}>
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
      {isLogged && (
        <NavLink to="/statistic">
          <Button
            label={"Статистика"}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/static/statistic.jpg)`,
            }}
            className={[classesCss.BubbleButton, classesCss.StatisticButton].join(
              " "
            )}
          />
        </NavLink>
      )}
      <BookButton className={cx(classesCss.BookButton)}/>
      {
        GAMES_ARRAY.map(game => {
          return(
            <GameButton
              key={game.name}
              game={game}
              className={cx(
                classesCss.BubbleButton,
                classesCss.GameButton,
                classesCss[setFirstLetterToCapital(game.key)])}
            />)
        })
      }
    </div>
  );
}
