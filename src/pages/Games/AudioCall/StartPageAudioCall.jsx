import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {setStatusGame} from '../../../redux/games/actions';
import {Grid} from "@material-ui/core";
import StartModal from "../common/StartModal";
import CloseButton from "../common/CloseButton";

const classes = {}

export default function StartPage () {
  const dispatch = useDispatch();

  const handleStart = useCallback(() => {
      dispatch(setStatusGame(true));
  }, [dispatch]);

  return (
      <>

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