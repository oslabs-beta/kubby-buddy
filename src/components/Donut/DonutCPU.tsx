import * as React from 'react';
const { useEffect, useState } = React;
import { Doughnut } from 'react-chartjs-2';

export default function Donut1(props: any) {
  let { data } = props;
  if (!data || !data.CPUPerc) {
    return null;
  }

  const [chartData, setChartData] = useState<any>({
    labels: ['Usage', 'Free Space'],
    datasets: [
      {
        label: 'Container Use Ratio',
        data: [0, 0],
        backgroundColor: ['rgb(255, 99, 500)', 'rgb(54, 162, 235)'],
      },
    ],
  });

  useEffect(() => {
    const newData: number = parseFloat(data.CPUPerc);
    setChartData({
      labels: ['Usage', 'Free space'],
      datasets: [
        {
          label: 'Container Use Ratio',
          data: [newData, 100 - newData],
          backgroundColor: [
            'rgba(245, 40, 145, 0.75)',
            'rgba(75, 48, 232, 0.75)',
          ],
        },
      ],
    });
  }, [data.CPUPerc]);

  return (
    <>
      <h1 className="header-linegraph">
        CPU Usage: {JSON.stringify(data.CPUPerc).replace(/"/g, '')}
      </h1>
      <div>
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
              },
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </>
  );
}
