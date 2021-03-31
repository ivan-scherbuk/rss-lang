import React, { useEffect, useState } from "react"
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import { setUserSettings } from "../../../redux/actions.user";
import { userSettingsRequestWithImage } from "../../../helpers/requsts.server";
import Button from "../../../components/Buttons/Button";
import UserImageEditor from "./UserImageEditor";
import classesCss from "../UserPage.module.scss";
import { SETTINGS } from "../../../settings";

export default function UserSettingsForm(){
  const {settings: userSettings, onLoading, token, id} = useSelector(state => state.user)
  const [currentImage, setCurrentImage] = useState({
    url: null,
    files : null
  })
  const [form, setForm] = useState({
    name : ""
  })
  const dispatch = useDispatch()

  async function sendHandler(){
    const data = new FormData()
    const settingsForServer = {optional: {...userSettings.optional, ...form}}
    console.log(currentImage)
    if(currentImage.files && currentImage.files[0]?.file){
      data.append("image", currentImage.files[0].file)
    }else if(!currentImage.url){
      data.append("removeImage", "true")
      settingsForServer.optional.image = ""
    }
    data.append("settings", JSON.stringify(settingsForServer))
    const rawRes = await userSettingsRequestWithImage({token, id, data})
    const res = await rawRes.json()
    dispatch(setUserSettings({
      optional: res.optional,
    }))
  }

  function updateForm(e){
    setForm({...form, [e.target.name]:e.target.value})
  }

  function imageUpdateHandler(files){
    setCurrentImage({
      url: files[0]? files[0].dataUrl: null,
      files
    })
  }

  useEffect(() => {
    if (userSettings.optional?.image && !currentImage.url) {
      setCurrentImage(state => ({...state, url:SETTINGS.AWS_STORE_URL + "/" + userSettings.optional?.image}))
    }
    if(userSettings.optional?.name){
      setForm({...form, ...userSettings.optional})
    }
  }, [userSettings.optional])

  return (
    <div className={classesCss.UserSettingsBlock}>
      <ImageUploading
        value={currentImage.files}
        onChange={imageUpdateHandler}
        maxNumber={1}
        dataURLKey="dataUrl"
      >
        {({onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps,}) => {
          return (
            <div className={classesCss.UploadImageWrap}>
              {
                onLoading ?
                  <div>Loading...</div>
                  : currentImage?.url ?
                  <UserImageEditor
                    image={currentImage.url}
                    onUpdate={onImageUpdate}
                    onRemove={onImageRemove}
                  />
                  : <Button
                    className={classesCss.ImageLoadButton}
                    style={isDragging ? {color: "red"} : null}
                    onClick={onImageUpload}
                    label={"Нажмите сюда или перетащите картинку"}
                    {...dragProps}
                  />
              }
            </div>
          )
        }}
      </ImageUploading>
      <input
        type={"text"}
        name={"name"}
        value={form.name}
        className={cx(classesCss.Input, {[classesCss.Empty]:!form.name})}
        onChange={updateForm}
        autoComplete={"off"}
        placeholder={"Имя"}
      />
      <Button
        onClick={sendHandler}
        label={"Сохранить"}
        className={classesCss.SendButton}
      />
    </div>
  )
}