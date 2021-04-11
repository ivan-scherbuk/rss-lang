import React from 'react';
import {createStyles, makeStyles} from "@material-ui/core";
import classesCss from "./StatisticPage.module.scss"

const StatisticsGameCard = (props) => {
  const { learnedWords, rightAnswersPercent, bestSeries, gameTitle } = props;
  const classes = useStyles();

  return (
    <table className={classesCss.StatisticTable}>
      <thead>
      <tr>
        <th className={classes.title}>{gameTitle}</th>
      </tr>
      </thead>

      <tbody>
      <tr className={classes.line}>
        <td>Количество изученных слов:</td>
        <td>{learnedWords}</td>
      </tr>

      <tr className={classes.line}>
        <td>Процент правильных ответов:</td>
        <td>{rightAnswersPercent}%</td>
      </tr>

      <tr className={classes.line}>
        <td>Лучшая серия:</td>
        <td>{bestSeries}</td>
      </tr>
      </tbody>

    </table>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      color: '#e45731',
      fontSize: '18px',
      lineHeight: '30px',
    },
    line: {
      lineHeight: '25px',
      "& td:last-child": {
        fontSize: '20px',
        color: '#567df4',
      }
    },
  }),
);
export default StatisticsGameCard;
