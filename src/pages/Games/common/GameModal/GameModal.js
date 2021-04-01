import React from 'react'
import classesCss from "./GameModal.module.scss"

export default function GameModal({children, gameData}){
  return(
    <div className={classesCss.GameModal}>
      <div className={classesCss.ModalText}>
        <h3>{gameData.name}</h3>

        {gameData.greetText}
      </div>
      {children}
    </div>
  )
}