import React, { useMemo } from 'react';
import {Line} from 'react-chartjs-2';
import classesCss from "./StatisticPage.module.scss"

const options = { responsive: true, maintainAspectRatio: false };

const BarChart = (props) => {
  const { data, label } = props;

  const dataBar = useMemo(() => ({
    labels: data?.map(({ t }) => (
      t.toLocaleDateString({}, {
        day: '2-digit', month: '2-digit', year: '2-digit',
      }))),
    datasets: [
      {
        label,
        backgroundColor: '#567DF4',
        borderColor: '#6979F8',
        borderWidth: 1,
        data,
      },
    ],
  }), [data]);

  return (
    <div className={classesCss.Chart}>
      {data?.length && (
        <Line
          data={dataBar}
          options={options}
        />
      )}
    </div>
  );
};

export default BarChart;
