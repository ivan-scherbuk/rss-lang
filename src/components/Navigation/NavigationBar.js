import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthBlock from "./AuthBlock";
import AuthForm from "../AuthForm/AuthForm";
import Button from "../Buttons/Button";
import classesCss from "./Navigation.module.scss";
import cx from "classnames"
import BookLink from "./BookLink";
import { useSelector } from "react-redux";


export default function NavigationBar() {
  const {isLogged} = useSelector(state => state.user)
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
      <BookLink className={cx(classesCss.BookButton)}/>
      <NavLink to={{ pathname: "/games/savannah"}}>
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
      <NavLink to={{ pathname: "/games/puzzle" }}>
        <Button
          label={"Пазл"}
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
    </div>
  );
}
