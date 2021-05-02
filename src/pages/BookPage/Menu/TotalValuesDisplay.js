import React from "react"

export default function TotalValuesDisplay({totalValues: {learned,success,fail}}){
  return(
    <div>
      <div>Изучаемых слов: {learned}</div>
      <div>
        Успешно: {success}/{success + fail}
      </div>
    </div>
  )
}