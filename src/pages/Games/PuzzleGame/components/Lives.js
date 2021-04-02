import classesCss from '../PuzzleGame.module.scss'
import cx from 'classnames'

export default function Lives({totalLives = 1, livesCount = 1}){

  return(
    <div className={classesCss.LivesWrapper}>
      {
        new Array(totalLives).fill(null).map((el, index) => {
          const classes = cx(
            classesCss.Life,
            {[classesCss.Burnt]:index+1 > livesCount})

          return(
            <div
              key={`life${index}`}
              className={classes}
            >
            </div>
          )
        })
      }

    </div>
  )
}