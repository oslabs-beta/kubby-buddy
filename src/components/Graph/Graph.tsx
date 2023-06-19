import React, { useState, useEffect } from 'react';
import './Graph.scss';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { GraphProps } from '../../types';

export function Graph(props: GraphProps) {
  // const num = parseFloat(props.CPUPerc)
  const [userData, setUserData] = useState({
    labels: ['CPU'],
    datasets: [
      {
        label: '%',
        data: [20],
      },
    ],
  });

  console.log('props', props.data, parseFloat(props.data.CPUPerc));
  if (10 > 11) {
    setUserData({
      labels: ['CPU'],
      datasets: [
        {
          label: '%',
          data: [parseFloat(props.CPUPerc)],
        },
      ],
    });
  }

  useEffect(() => {
    // const updateedNum = parseFloat(props.CPUPerc)

    setUserData({
      labels: ['CPU'],
      datasets: [
        {
          label: '%',
          data: [parseFloat(props.data.CPUPerc)],
        },
      ],
    });
  }, [props.data]);
  return (
    <div className="graph">
      <Bar
        data={userData}
        options={{
          scales: {
            y: {
              stacked: true,
              min: 0,
              max: 2,
            },
          },
        }}
      />
    </div>
  );
}
