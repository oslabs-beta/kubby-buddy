import React, { useState, useEffect } from 'react';
import './Graph.scss';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { GraphProps } from '../../types';

export function Graph(props: GraphProps) {
  // const num = parseFloat(props.CPUPerc)
  // const [limit, setLimit] = useState(1);
  const [userData, setUserData] = useState({
    labels: ['CPU', 'Memory', 'Net I/O', 'Block I/O'],
    datasets: [
      {
        label: 'CPU%',
        data: [
          parseFloat(props.data?.CPUPerc),
          parseFloat(props.data?.MemPerc),
          parseFloat(props.data?.CPUPerc),
          parseFloat(props.data?.CPUPerc),
        ],
        backgroundColor: ['#ff7c02'],
      },
      {
        label: 'Avail%',
        data: [
          100 - parseFloat(props.data?.CPUPerc),
          100 - parseFloat(props.data?.MemPerc),
          100 - parseFloat(props.data?.CPUPerc),
          100 - parseFloat(props.data?.CPUPerc),
        ],
      },
    ],
    categoryPercentage: 0.1,
    barPercentage: 1.0,
  });

  function netParser(net: string): number[] {
    const result: number[] = [];
    const indexey: number = net?.indexOf('B');
    result.push(parseFloat(net?.slice(0, indexey - 2)));
    result.push(parseFloat(net?.slice(indexey + 3)) + 1 * 1000);
    return result;
  }
  console.log(
    parseFloat(props.data?.NetIO.slice(props.data?.NetIO.indexOf('B') + 3))
  );
  useEffect(() => {
    // const updateedNum = parseFloat(props.CPUPerc)
    const parsedNet = netParser(props.data?.NetIO);
    console.log(parsedNet, 'useEffeect');
    setUserData({
      labels: ['CPU', 'Memory', 'Net I/O'],
      datasets: [
        {
          label: 'CPU%',
          data: [
            parseFloat(props.data?.CPUPerc),
            parseFloat(props.data?.MemPerc),
            (parsedNet[0] / parsedNet[1]) * 100,
          ],
          backgroundColor: ['#ff7c02'],
        },
        {
          label: 'Avail%',
          data: [
            100 - parseFloat(props.data?.CPUPerc),
            100 - parseFloat(props.data?.MemPerc),
            (1 - parsedNet[0] / parsedNet[1]) * 100,
          ],
        },
      ],
      categoryPercentage: 0.1,
      barPercentage: 0.1,
    });

    // setLimit(parseFloat(props.data?.CPUPerc) * 2);
  }, [props.data]);
  return (
    <div className="graph">
      <Bar
        data={userData}
        options={{
          scales: {
            y: {
              stacked: false,
              min: 0,
              max: 100,
            },
          },
          responsive: true,
          indexAxis: 'y',
        }}
      />
    </div>
  );
}
