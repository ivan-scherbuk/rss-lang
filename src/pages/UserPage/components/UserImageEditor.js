import React, { useState } from "react"
import cx from "classnames"
import classesCss from "../UserPage.module.scss"
import Button from "../../../components/Buttons/Button";


export default function UserImageEditor({image, onUpdate, onRemove}){

  const [onHoverState, setOnHover] = useState(null)

  return(
    <div
      className={classesCss.ImageEditor}
      style={{backgroundImage: `url(${image})`, color: "white"}}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}

    >
      <div
        className={
          cx({[classesCss.Visible]:onHoverState}, classesCss.Overlay)
        }>
        <Button
          className={classesCss.Button}
          label={"Редактировать"}
          onClick={onUpdate}
        />
        <Button
          className={cx(classesCss.Button, classesCss.RemoveButton)}
          label={"Удалить"}
          onClick={onRemove}
        />
      </div>
    </div>
  )
}