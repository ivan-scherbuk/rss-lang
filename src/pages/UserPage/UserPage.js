import React, { useState } from "react"
import { useSelector } from "react-redux";
import ImageUploading from "react-images-uploading";
import classesCss from "./UserPage.module.scss"
import { userSettingsRequestWithImage } from "../../helpers/requsts.server";
import UserSettingsForm from "./components/UserSettingsForm";


export default function UserPage(){

  const {token, id} = useSelector(state => state.user)



  return (
    <div className={classesCss.UserPage}>
      <UserSettingsForm />
    </div>
  )
}
