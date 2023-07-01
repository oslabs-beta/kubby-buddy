import React, { FC, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';

import { StopCommands } from '../Button/Stop';

import { LogCommands } from '../Button/Logs';
import Loader from '../Loader/Loader';
// import { Graph } from '../Graph/Graph';
import LineGraph from '../LineGraph/Line';
import Donut1 from '../Donut/DonutCPU';

import Donut2 from '../Donut/DonutMemory';

export const DisplayRunning: FC = () => {
  const { runningContainers, statStream } = useContext(UserContext);

  const [change, setChange] = useState(false);

  const updateChange = () => {
    setChange((prevChange) => !prevChange);
  };

  useEffect(() => {
    // Call the updateChange function whenever statStream is updated
    updateChange();
    console.log(runningContainers);
  }, [runningContainers, statStream]);

  let running = runningContainers.map((el, index) => (
    <div className="container" key={index}>
      <div className="container-info">
        <div className="container-name">{el.Names}</div>
        <div className="subinfo">
          <p className="Imagename">Image: {el.Image}</p>
          <p className="Port">Port: {el.Ports}</p>
        </div>
      </div>

      <div className="cmdbutton">
        <StopCommands
          name={el.Names}
          cmdRoute={new URL('/container/stop', window.location.href)}
          fetchMethod="post"
        />
        <LogCommands
          name={el.Names}
          cmdRoute={
            new URL(`/container/log?name=${el.Names}`, window.location.href)
          }
          fetchMethod="get"
        />
      </div>
      <div className="chartContainer">
        {statStream.length > 0 ? (
          <Donut1 className="bargraph" data={statStream[index]} />
        ) : (
          ''
        )}
      </div>
      <div className="chartContainer">
        {statStream.length > 0 ? (
          <Donut2 className="bargraph" data={statStream[index]} />
        ) : (
          <Loader />
        )}
      </div>
      <div className="chartContainer">
        {statStream.length > 0 ? (
          <LineGraph
            className="bargraph"
            data={statStream[index]}
            change={change}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  ));

  return <div className="dockercontainer">{running}</div>;
};
