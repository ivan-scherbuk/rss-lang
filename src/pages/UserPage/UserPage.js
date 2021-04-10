import React from "react"
import classesCss from "./UserPage.module.scss"
import UserSettingsForm from "./components/UserSettingsForm";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {logOut} from "../../redux/actions.auth";
import CloseLink from "../../components/Buttons/CloseLink";
import StatisticsPage from "../StatisticsPage/StatisticsPage";


export default function UserPage(){

  const dispatch = useDispatch()

  return (
    <div className={classesCss.UserPage}>
      <div className={classesCss.UserSettingsBlockContainer}>
        <UserSettingsForm />
        <NavLink
          className={classesCss.ExitButton}
          to={"/"}
          onClick={() => dispatch(logOut())}
        >Выйти из аккаунта
        </NavLink>
      </div>

      <StatisticsPage />

      <CloseLink/>
    </div>
  )
}
