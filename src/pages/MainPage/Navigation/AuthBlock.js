import React, { useState } from "react"
import cx from "classnames"
import Button from "../../../components/Buttons/Button"
import AuthModal from "./AuthModal"
import classesCss from "./Navigation.module.scss"
import Avatar from "@material-ui/core/Avatar"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import {SETTINGS} from "../../../settings";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";


export default function AuthBlock({children}){

  const {isLogged, email, settings, onLoading} = useSelector(state => state.user)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <div className={classesCss.AuthBlock}>
      {
        !isLogged
          ? <Button
            style={{backgroundImage: `url(${process.env.PUBLIC_URL}/static/register2.jpg)`}}
            label={"Войти"}
            className={cx(
              classesCss.BubbleButton, classesCss.LoginButton, classesCss.AuthButton,
              {[classesCss.Active]:modalIsOpen && !isLogged}
            )}
            onClick={() => setModalIsOpen(!modalIsOpen)}
          />
          :
          <NavLink
            className={classesCss.Avatar}
            to="/user">
            <Avatar
              alt={email.toUpperCase()}
              src={settings?.optional?.image ?
                `${SETTINGS.AWS_STORE_URL}/${settings.optional.image}`
                : `${SETTINGS.AWS_STORE_URL}/${SETTINGS.DEFAULT_IMAGE}`}
            />
          </NavLink>
      }
      <AuthModal
        onClose={() => setModalIsOpen(false)}
        className={cx(
          classesCss.AuthModal,
          {[classesCss.Active]: modalIsOpen && !isLogged},
        )}
      >
        {onLoading? <LoadingOverlay className={classesCss.LoadingOverlay} />: null}
        {children}
      </AuthModal>
    </div>
  )
}