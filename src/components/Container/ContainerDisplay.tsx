import React, { FC, useContext, useEffect, useState, useMemo } from 'react';
import { UserContext } from '../../UserContext';
// import { StartCommands } from '../Button/Start';
import { StopCommands } from '../Button/Stop';

import { LogCommands } from '../Button/Logs';
// import { Graph } from '../Graph/Graph';
import LineGraph from '../LineGraph/Line';
import Donut1 from '../Donut/DonutCPU';
import Loader from '../Loader/Loader';
import Donut2 from '../Donut/DonutMemory';
import { Container } from '../../types';

export const DisplayRunning: FC = () => {
  const { runningContainers, statStream } = useContext(UserContext);
  // const [stopInvoked, setStop] = useState(false);
  const [change, setChange] = useState(false);
  // console.log('testtest====', runningContainers);

  // const handleStopInvoke = () => {
  //   if (!stopInvoked) setStop(true);
  //   else setStop(false);
  // };

  const updateChange = () => {
    setChange((prevChange) => !prevChange);
  };

  const RunningContainer: React.FC<{ el: Container; index: number }> =
    React.memo(({ el, index }) => {
      return (
        <div className="container">
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
              ''
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
      );
    });

  useEffect(() => {
    // Call the updateChange function whenever statStream is updated
    updateChange();
    console.log(runningContainers);
  }, [runningContainers, statStream]);

  let running;

  if (typeof runningContainers === 'string') {
    running = <Loader />;
  } else {
    running = useMemo(
      () =>
        runningContainers.map((el, index) => (
          <RunningContainer
            el={el}
            index={index}
            key={`runningcontainer-${index}`}
          />
        )),
      [runningContainers]
    );
  }

  return <div className="dockercontainer">{running}</div>;
};
