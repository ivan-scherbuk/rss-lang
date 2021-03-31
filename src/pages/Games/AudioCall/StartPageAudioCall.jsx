import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {setStatusGame} from '../../../redux/games/actions';
import {Grid} from "@material-ui/core";
import StartModal from "../common/StartModal";
import CloseButton from "../common/CloseButton";
import classesCss from "./AudioCallGame.module.scss";
import background from "../../../assets/images/audiocall.jpg"

const classes = {}

export default function StartPage () {
  const dispatch = useDispatch();

  const handleStart = useCallback(() => {
      dispatch(setStatusGame(true));
  }, [dispatch]);

  return (
      <>
          {/* <img src={background} alt="audiocall background" className={classes.backgroundImg}/> */}
          <Grid container direction="column" justify="center" alignItems="center" className={classes.container}>
              <Grid container justify="flex-end" className={classes.exitContainer}>
                  <CloseButton/>
              </Grid>
              <StartModal title="Аудиовызов"
                          description="Тренировка Аудиовызов развивает словарный запас. Выбирайте правильный
                      перевод слова из предложенных."
                          classes={{container: classes.container}}
                          handleStart={handleStart}
                          label="Начать">
              </StartModal>
          </Grid>
      </>
  );
};