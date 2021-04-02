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
          <img src={background} alt="audiocall background" className={classesCss.backgroundImg}/>
          <Grid container direction="column" justify="center" alignItems="center" className={classesCss.container}>
              <Grid container justify="flex-end" className={classesCss.exitContainer}>
                  <CloseButton/>
              </Grid>
              <StartModal title="Аудиовызов"
                          description="Тренировка Аудиовызов развивает словарный запас. Выбирайте правильный
                      перевод слова из предложенных."
                          handleStart={handleStart}
                          classes={{container: classes.container}}
                          label="Начать">
              </StartModal>
          </Grid>
      </>
  );
};