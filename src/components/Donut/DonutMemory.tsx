import * as React from 'react';
const { useEffect, useState } = React;
import { Doughnut } from 'react-chartjs-2';

export default function Donut2(props: any) {
  let { data } = props;
  if (!data || !data.MemPerc) {
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
    const newData: number = parseFloat(data.MemPerc);
    setChartData({
      labels: ['Usage', 'Free space'],
      datasets: [
        {
          label: 'Container Use Ratio',
          data: [newData, 100 - newData],
          backgroundColor: ['rgb(1, 131, 254)', 'rgb(254,124,1)'],
        },
      ],
    });
  }, [data.MemPerc]);

  return (
    <>
      <h1 className="header-linegraph">
        Memory Usage: {JSON.stringify(data.MemPerc).replace(/"/g, '')}
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
