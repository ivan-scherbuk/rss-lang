import React, { useEffect, useState } from "react"
import classesCss from "../UserPage.module.scss";
import ImageUploading from "react-images-uploading";
import { useSelector } from "react-redux";
import { userSettingsRequestWithImage } from "../../../helpers/requsts.server";
import Button from "../../../components/Buttons/Button";
import UserImageEditor from "./UserImageEditor";
import { SETTINGS } from "../../../settings";

export default function UserSettingsForm(){

  const [currentShownImage, setCurrentShownImage] = useState(null)
  const [form, setForm] = useState({
    userImage: null,
  })
  const {settings: userSettings, name, onLoading, token, id} = useSelector(state => state.user)

  async function sendHandler(){
    const data = new FormData()
    data.append("image", form.userImage[0].file)
    data.append("settings", JSON.stringify({optional: {hard: "easy"}}))
    const rawRes = await userSettingsRequestWithImage({token, id, data})
    const res = await rawRes.json()
  }

  function imageUpdateHandler(){

  }

  useEffect(() => {
    if (userSettings.optional.image) {
      setForm(state => ({...state, currentImage: SETTINGS.AWS_STORE_URL+"/"+userSettings.optional?.image}))
    }
  }, [userSettings.optional?.image])


  return (
    <div className={classesCss.UserSettingsBlock}>
      <ImageUploading
        value={form.userImage}
        onChange={files => setForm({...form, userImage: files})}
        maxNumber={1}
        dataURLKey="dataUrl"
      >
        {({
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => {
          return (
            <div className={classesCss.UploadImageWrap}>
              {
                onLoading ?
                  <div>Loading...</div>
                  : form.currentImage ?
                  <UserImageEditor
                    image={form.currentImage}
                    onUpdate={onImageUpdate}
                    onRemove={onImageRemove}
                  />
                  :
                  <Button
                    className={classesCss.ImageLoadButton}
                    style={isDragging ? {color: "red"} : null}
                    onClick={onImageUpload}
                    label={"Нажмите сюда или перетащите картинку"}
                    {...dragProps}
                  />
              }
            </div>
          )
        }
        }
      </ImageUploading>
      <Button
        onClick={sendHandler}
        label={"Сохранить"}
      />
    </div>
  )
}

// <div className={classesCss.ImageButtonsBar}>
// <button
//     onClick={() => {onImageUpdate(0)}}
//     className={classesCss.ButtonImageHandler}>
//     Update
//   </button>
//   <button
//     onClick={() => {
//       onImageRemove(index)
//     }}
//     className={classesCss.ImageHandler}
//   >
//     Remove
//   </button>
// </div>