import React, { FC, useState } from 'react';
import './Graph.scss';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export const Graph: FC = () => {
  const [userData, setUserData] = useState({
    labels: ['CPU'],
    datasets: [
      {
        label: '%',
        data: [80],
      },
    ],
  });

  if (10 > 11) {
    setUserData({
      labels: ['CPU'],
      datasets: [
        {
          label: '%',
          data: [80],
        },
      ],
    });
  }
  return (
    <div className="graph">
      <Bar
        data={userData}
        options={{
          scales: {
            y: {
              stacked: true,
              min: 0,
              max: 100,
            },
          },
        }}
      />
    </div>
  );
};
