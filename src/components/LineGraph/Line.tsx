import * as React from 'react';
const { useEffect, useState, useRef } = React;
import Chart from 'chart.js/auto';
import './LineScss.scss';
import 'chartjs-adapter-luxon';
import { Line } from 'react-chartjs-2';
import ChartStreaming from 'chartjs-plugin-streaming';
Chart.overrides.line.spanGaps = true;
Chart.register(ChartStreaming);

export default function LineChart(props: any) {
  const { data, change } = props;
  if (!data || !data.NetIO) {
    return null;
  }

  const chart = useRef<Chart<'line'>>();
  const [chartData, setChartData] = useState<any>({
    datasets: [
      {
        label: 'Network Input',
        data: [],
        backgroundColor: 'rgba(38, 189, 106, 0.75)',
        spanGaps: true,
      },
      {
        label: 'Network Output',
        data: [],
        backgroundColor: 'rgba(221, 80, 105, 0.75)',
        spanGaps: true,
      },
    ],
  });

  useEffect(() => {
    const newData = {
      value1: dataSplit(data.NetIO)[0],
      value2: dataSplit(data.NetIO)[1],
      timestamp: new Date(),
    };
    setData(newData);
  }, [change]);

  function setData(dataObj: any) {
    setChartData((prevState: any) => {
      const updatedData1 = [
        ...prevState.datasets[0].data,
        {
          x: Number(dataObj.timestamp),
          y: dataObj.value1,
        },
      ];
      const updatedData2 = [
        ...prevState.datasets[1].data,
        {
          x: Number(dataObj.timestamp),
          y: dataObj.value2,
        },
      ];
      const updatedBackgroundColors1 = Array(updatedData1.length).fill(
        'rgba(38, 189, 106, 0.75)'
      );
      const updatedBackgroundColors2 = Array(updatedData2.length).fill(
        'rgba(221, 80, 105, 0.75)'
      );
      return {
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: updatedData1,
            backgroundColor: updatedBackgroundColors1,
          },
          {
            ...prevState.datasets[1],
            data: updatedData2,
            backgroundColor: updatedBackgroundColors2,
          },
        ],
      };
    });

    chart.current?.update('quiet');
  }

  function dataSplit(string: string) {
    if (!string) {
      return [];
    }
    const result: number[] = [];
    const stringArr = string.split(' / ');
    stringArr.forEach((el) => {
      let numEl: number;
      if (el.includes('mB')) {
        numEl = parseFloat(el) * 1000;
      }
      if (el.includes('kB')) {
        numEl = parseFloat(el);
      } else {
        numEl = parseFloat(el) / 1000;
      }
      result.push(numEl);
    });
    return result;
  }

  return (
    <div className="lineGraph">
      <Line
        ref={chart}
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
            streaming: {
              duration: 20000,
              refresh: 100,
              delay: 1000,
              frameRate: 100,
            },
          },
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                duration: 20000,
                refresh: 100,
                delay: 1000,
              },
            },
          },
          elements: {
            line: {
              spanGaps: true,
            },
          },
        }}
      />
    </div>
  );
}
