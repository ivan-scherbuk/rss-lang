import { useDispatch, useSelector } from "react-redux";
import { statisticsSelector } from "../redux/games/selectors";
import { populateStatistics } from "../helpers/gameUtils";
import { addStatisticsThunk } from "../redux/games/thunk.statistics";
import { useCallback } from "react";

export function useStatistic(){
  const currentUserStatistic = useSelector(statisticsSelector)
  const {id} = useSelector(store => store.user)
  const dispatch = useDispatch()
  const update = useCallback((game, statistic) => {
    const statisticForUpdate = populateStatistics(
      game, //puzzle
      currentUserStatistic,
      {
        ...statistic,
        createdOn: Date.now()}
    );
    statisticForUpdate.learnedWords = statistic.wordCounter
    dispatch(addStatisticsThunk(id, statisticForUpdate));
  }, [currentUserStatistic, dispatch, id])
  return {update}
}