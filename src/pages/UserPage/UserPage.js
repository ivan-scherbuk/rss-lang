import React, { useState } from "react"
import {useSelector} from "react-redux";
import classesCss from "./UserPage.module.scss"
import {userSettingsRequestWithImage} from "../../helpers/requsts.server";


export default function UserPage(){
  const [file, setFile] = useState(null)
  const {token,id} = useSelector(state => state.user)

  async function onSend(){
    const data = new FormData()
    data.append('image', file)
    data.append("settings", JSON.stringify({optional:{hard: "easy"}}))
    const rawRes = await userSettingsRequestWithImage({token,id,data})
    const res = await rawRes.json()
    console.log(res)
  }

  return (
    <div className={classesCss.UserPage}>
      <input
        onChange={e => {
          setFile(e.target.files[0])
          //console.log(e.target.files)
        }}
        type={"file"}/>
      <button onClick={() => onSend()}>send</button>
    </div>
  )
}
